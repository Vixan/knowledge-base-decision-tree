const probability = (featureValue: any, objectValues: any[]) =>
  objectValues.filter((object) => object === featureValue).length /
  objectValues.length;

const unique = (array: any[]) => [...new Set(array)];

const entropy = (objectValues: any[]) =>
  unique(objectValues).reduce((sum, objectValue) => {
    const objectValueProbability = probability(objectValue, objectValues);

    return sum - objectValueProbability * Math.log2(objectValueProbability);
  }, 0);

type DataObject = {
  [key: string]: any;
};

const gain = (
  dataset: DataObject[],
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
  dataset: DataObject[],
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

const LABELS = {
  LEAF: "Leaf",
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
  dataset: DataObject[],
  targetFeature: string,
  relativeFeatures: string[]
) => {
  const targetFeatureValues = dataset.map((object) => object[targetFeature]);
  const uniqueTargetFeatureValues = unique(targetFeatureValues);

  if (uniqueTargetFeatureValues.length === 1 || relativeFeatures.length === 0) {
    const mostCommonTargetFeatureValue =
      mostCommonFeatureValue(targetFeatureValues);

    return {
      name: mostCommonTargetFeatureValue,
      type: LABELS.LEAF,
      value: mostCommonTargetFeatureValue,
    };
  }

  const bestGain = maxGain(dataset, targetFeature, relativeFeatures);
  const remainingFeatures = relativeFeatures.filter(
    (feature) => feature !== bestGain.feature
  );
  const possibleFeatureValues = unique(
    dataset.map((object) => object[bestGain.feature])
  );

  const nodeValues: any = possibleFeatureValues.map((featureValue) => {
    const featureValuesSubset = dataset.filter(
      (object) => object[bestGain.feature] === featureValue
    );

    const child = generateTree(
      featureValuesSubset,
      targetFeature,
      remainingFeatures
    );

    return {
      name: featureValue,
      prob: featureValuesSubset.length / dataset.length,
      child: child,
    };
  });

  return {
    name: bestGain.feature,
    gain: bestGain,
    values: nodeValues,
  };
};

export const predict = (tree: DataObject, dataset: DataObject[]): any => {
  if (tree.type === LABELS.LEAF) {
    return tree.value;
  }

  const node = tree.values.find(
    (node: DataObject) => node.name === dataset[tree.name]
  );

  return predict(node?.child ?? tree.values[0].child, dataset);
};
