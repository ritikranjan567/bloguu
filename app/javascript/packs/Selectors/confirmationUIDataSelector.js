
export const getActiveConformationTypeData = (state) => {
  let {confirmation} = state;
  for (const props in confirmation){
    if (confirmation[props].show){
      return props;
    }
  }
  return null;
}