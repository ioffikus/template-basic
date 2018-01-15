if (!window.matchMedia) {
  window.matchMedia = function() {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
}
