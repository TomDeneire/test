const DB =
  "https://github.com/TomDeneire/InformationScience/blob/main/course/data/stcv.sqlite";

const db = new sqlite3.oo1.DB();
await fetch(DB)
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    const p = sqlite3.wasm.allocFromTypedArray(bytes);
    db.onclose = {
      after: function () {
        sqlite3.wasm.dealloc(p);
      },
    };
    const rc = sqlite3.capi.sqlite3_deserialize(
      db.pointer,
      "main",
      p,
      bytes.length,
      bytes.length,
      0
    );
    db.checkRc(rc);
  });
