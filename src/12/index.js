export const formatInput = input =>
  input
    .split('\n')
    .map(line => line.split('-'))
    .reduce(
      (acc, [start, end]) => ({
        ...acc,
        [start]: [...(acc[start] || []), end].filter(cave => cave !== 'start'),
        [end]: [...(acc[end] || []), start].filter(cave => cave !== 'start'),
      }),
      {},
    );

const display = input => {
  console.log([...input].map(path => path.join(',')).join('\n'), '\n');
  return input;
};

const getPaths = ({ cave, path, input, canRevisit, paths }) => {
  path = [...path, cave];

  if (cave === 'end') {
    paths.add(path);
    return;
  }

  input[cave].forEach(targetCave => {
    if (targetCave.toLowerCase() === targetCave && path.includes(targetCave)) {
      if (!canRevisit) {
        return;
      }
      getPaths({ cave: targetCave, path, input, canRevisit: false, paths });
    } else {
      getPaths({ cave: targetCave, path, input, canRevisit, paths });
    }
  });

  return paths;
};

export const partOne = input =>
  getPaths({
    path: [],
    cave: 'start',
    input,
    canRevisit: false,
    paths: new Set(),
  }) /* |> display */ |> result => result.size;

export const partTwo = input =>
  getPaths({
    path: [],
    cave: 'start',
    input,
    canRevisit: true,
    paths: new Set(),
  }) /* |> display */ |> result => result.size;
