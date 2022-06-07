/* This make a mock get-call so we doesnt direct make calls to the API, which reduces run-time*/
export default {
  get: jest.fn().mockResolvedValue({ data: {} }),
};
