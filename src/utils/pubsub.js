const PubSub = {
  _listeners: {},
  subscribe(key, callback) {
    if (!this._listeners.hasOwnProperty(key)) this._listeners[key] = [];
    this._listeners[key].push(callback);
    return () => {
      this._listeners[key] = this._listeners[key].filter(
        (cb) => cb !== callback
      );
    };
  },
  dispatch(key, payload) {
    if (!this._listeners.hasOwnProperty(key)) return;
    this._listeners[key].forEach((callback) => callback(payload));
  },
};

export default PubSub;
