import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

const log = console.log;
const error = console.error;
const btn = document.getElementsByTagName("button")[0];
let db = null;

btn.addEventListener("click", () => {
  db.exec({
    sql: "SELECT 1",
    callback: (row) => {
      console.log(row);
    },
  });
});

/**
 * @param {import("@sqlite.org/sqlite-wasm").Sqlite3Static} sqlite3
 */
const start = (sqlite3) => {
  log("Running SQLite3 version", sqlite3.version.libVersion);
  db = new sqlite3.oo1.DB("/mydb.sqlite3", "ct");
};

const initializeSQLite = async () => {
  try {
    log("Loading and initializing SQLite3 module...");
    const sqlite3 = await sqlite3InitModule({
      print: log,
      printErr: error,
    });
    log("Done initializing. Running demo...");
    start(sqlite3);
  } catch (err) {
    error("Initialization error:", err.name, err.message);
  }
};

initializeSQLite();
