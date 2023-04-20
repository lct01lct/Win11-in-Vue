export const getUUid = (v) => {
  const isObj = typeof v === 'object';
  if (!isObj) {
    throw new Error('YOU PASS THE PARAMS IS NOT A ATTRIBUTES MAP');
  }

  const hasUUID = v.__sg_uuid || null;
  if (hasUUID) {
    return hasUUID.value;
  } else {
    return undefined;
  }
};
