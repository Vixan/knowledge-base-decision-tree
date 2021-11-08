export type TreeNode = {
  name: string;
  attributes?: Record<string, any>;
  children?: TreeNode[];
};

const probability = (featureValue: any, objectValues: any[]) =>
  objectValues.filter((object) => object === featureValue).length /
  objectValues.length;

const unique = (array: any[]) => [...new Set(array)];

const entropy = (objectValues: any[]) =>
  unique(objectValues).reduce((sum, objectValue) => {
    const objectValueProbability = probability(objectValue, objectValues);

    return sum - objectValueProbability * Math.log2(objectValueProbability);
  }, 0);

const gain = (
  dataset: Record<string, any>[],
  targetFeature: string,
  relativeFeature: string
) => {
  const relativeFeatureValues = unique(
    dataset.map((object) => object[relativeFeature])
  );
  const targetFeatureValues = dataset.map((object) => object[targetFeature]);
  const datasetEntropy = entropy(targetFeatureValues);

  const getRelativeFeatureEntropy = (value: any) => {
    const subset = dataset.filter(
      (object) => object[relativeFeature] === value
    );
    const subsetEntropy = entropy(
      subset.map((object) => object[targetFeature])
    );

    return (subset.length / dataset.length) * subsetEntropy;
  };
  const relativeFeatureEntropies = relativeFeatureValues.map(
    getRelativeFeatureEntropy
  );

  const relativeFeatureEntropiesTotal = relativeFeatureEntropies.reduce(
    (sum, entropy) => sum + entropy,
    0
  );

  return datasetEntropy - relativeFeatureEntropiesTotal;
};

const maxGain = (
  dataset: Record<string, any>[],
  targetFeature: string,
  relativeFeatures: string[]
) => {
  const gains = relativeFeatures.map((relativeFeature) => ({
    feature: relativeFeature,
    value: gain(dataset, targetFeature, relativeFeature),
  }));

  return gains.reduce(
    (max, gain) => (gain.value > max.value ? gain : max),
    gains[0]
  );
};

const mostCommonFeatureValue = (dataset: any[]) => {
  const valueOccurencesMap = dataset.reduce(
    (counts, value) => ({
      ...counts,
      [value]: (counts[value] || 0) + 1,
    }),
    {}
  );

  const keys = Object.keys(valueOccurencesMap);

  return keys.reduce(
    (a, b) => (valueOccurencesMap[a] > valueOccurencesMap[b] ? a : b),
    keys[0]
  );
};

export const generateTree = (
  dataset: Record<string, any>[],
  targetFeature: string,
  relativeFeatures: string[]
): TreeNode => {
  const targetFeatureValues = dataset.map((object) => object[targetFeature]);
  const uniqueTargetFeatureValues = unique(targetFeatureValues);

  if (uniqueTargetFeatureValues.length === 1 || relativeFeatures.length === 0) {
    const mostCommonTargetFeatureValue =
      mostCommonFeatureValue(targetFeatureValues);

    return {
      name: mostCommonTargetFeatureValue?.toString(),
    };
  }

  const bestGain = maxGain(dataset, targetFeature, relativeFeatures);
  const remainingFeatures = relativeFeatures.filter(
    (feature) => feature !== bestGain.feature
  );
  const possibleFeatureValues = unique(
    dataset.map((object) => object[bestGain.feature])
  );

  const nodeValues: TreeNode[] = possibleFeatureValues.map((featureValue) => {
    const featureValuesSubset = dataset.filter(
      (object) => object[bestGain.feature] === featureValue
    );

    const children = generateTree(
      featureValuesSubset,
      targetFeature,
      remainingFeatures
    );

    return {
      name: featureValue?.toString(),
      attributes: {
        prob: (featureValuesSubset.length / dataset.length).toFixed(2),
      },
      children: [children],
    };
  });

  return {
    name: bestGain.feature?.toString(),
    attributes: {
      gain: bestGain.value?.toFixed(2)
    },
    children: nodeValues,
  };
};

export const predict = (tree: Record<string, any>, dataset: Record<string, any>[]): any => {
  if (!tree.children?.length) {
    return tree.value;
  }

  const node = tree.values.find(
    (node: Record<string, any>) => node.name === dataset[tree.name]
  );

  return predict(node?.child ?? tree.values[0].child, dataset);
};
