import gun from 'gun';

class GunSingleton {
  constructor() {
    if (!GunSingleton.instance) {
      this._gunDB = gun([
        'http://localhost:8765/gun',
        'https://gun-manhattan.herokuapp.com/gun',
      ]);
      GunSingleton.instance = this;
    }

    return GunSingleton.instance;
  }

  db() {
    return this._gunDB;
  }
}

const gunSingleton = new GunSingleton();
Object.freeze(gunSingleton);

export default gunSingleton;
