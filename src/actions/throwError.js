export default function throwError(error) {
  if (error instanceof Error) {
    return {type: 'THROW_ERROR', error: error.message};
  } else {
    return {type: 'THROW_ERROR', error};
  }
}
