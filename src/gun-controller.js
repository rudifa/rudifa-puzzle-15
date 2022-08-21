import gunSingleton from './gun-singleton';

export class GunController {
  host;
  p2pdb;
  db;

  constructor(host) {
    this.host = host;
    this.db = gunSingleton.db();

    this.p2pdb = this.db.get('puzzle-15').get('grid-object');
    this.p2pdb.on((wrapped) => {
      console.log(`p2pdb.on`, this._unwrap(wrapped, 'grid'));
      this.host.newGrid(this._unwrap(wrapped, 'grid'));
    });
  }
  hostConnected() {
    console.log(`host connected`);
  }
  hostDisconnected() {
    console.log(`host disconnected`);
  }

  _wrap = (key, value) => {
    return {
      [key]: value,
    };
  };

  _unwrap = (wrapped, key) => {
    return wrapped[key];
  };

  sendGrid(gridJson) {
    console.log(`send gridJson:`, gridJson);
    this.p2pdb.put(this._wrap('grid', gridJson));
  }
}
