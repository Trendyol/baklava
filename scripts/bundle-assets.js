/**
 * @file bundle-assets.js - Move assets around as needed for various environment needs.
 * @see https://medium.com/swlh/how-to-backup-files-using-node-js-and-rsync-bbea20701696
 */

const Rsync = require('rsync');
const grace = require('../grace.config');

function runRsync(dest) {
  const rsync = new Rsync();
  rsync.flags('avzP');
  rsync.set('delete');
  rsync.source(grace.assets.dir);
  rsync.destination(dest);
  return new Promise((resolve, reject) => {
    try {
      let logData = '';
      rsync.execute(
        (error, code, cmd) => {
          resolve({ error, code, cmd, data: logData });
        },
        data => {
          logData += data;
        },
        err => {
          logData += err;
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  grace.assets.sync.map(async dest => {
    await runRsync(dest);
  });
})();
