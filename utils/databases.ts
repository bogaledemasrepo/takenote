import * as SQLite from "expo-sqlite";
export interface NOTESTYPE {
  ID: string;
  TITLE: string;
  BODY: string;
  ISFAVORITE: string;
}
export interface USERDATA {
  username: string;
  fullname: string;
  password: string;
  profile: string;
}
const db = SQLite.openDatabaseSync("notes.db");

export async function initDb() {
  await db.withTransactionAsync(async () => {
    try {
      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS USERS(USERNAME TEXT PRIMARY KEY NOT NULL,FULLNAME TEXT NOT NULL,PASSWORD TEXT,PROFILE TEXT)"
      );
      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS NOTES(ID TEXT PRIMARY KEY NOT NULL,TITLE TEXT NOT NULL,BODY TEXT NOT NULL,ISFAVORITE TEXT DEFAULT '0',USERNAME TEXT NOT NULL)"
      );
    } catch (error) {
      console.log(error);
    }
  });
}
export async function getAllNotes() {
  try {
    const result = (await db.getAllAsync("SELECT * FROM NOTES")) as NOTESTYPE[];
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}
export async function insertNote(
  title: string,
  body: string,
  username: string
) {
  try {
    const result = await db.execAsync(
      `INSERT INTO NOTES VALUES('${Date.now().toString()}','${title}','${body}','0','${username}')`
    );
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: error };
  }
}
export async function updateNotes(id: string, title: string, body: string) {
  try {
    await db.execAsync(`UPDATE NOTES SET TITLE="${title}"  WHERE ID=${id}`);
    return { status: "success", data: null };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}
export async function delateNote(id: string) {
  try {
    const result = await db.execAsync(`DELETE FROM NOTES WHERE ID=${id}`);
    console.log("Deleted");
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}

export async function getNote(id: string) {
  try {
    const result = (await db.getFirstAsync(
      `SELECT * FROM NOTES WHERE ID=${id}`
    )) as NOTESTYPE;
    console.log(result);
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: null };
  }
}

export async function addToFavorite(id: string) {
  try {
    const result = await db.execAsync(
      `UPDATE NOTES SET ISFAVORITE='1' WHERE ID=${id}`
    );
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}

export async function removeFromFavorite(id: string) {
  try {
    const result = await db.execAsync(
      `UPDATE NOTES SET ISFAVORITE='0' WHERE ID=${id}`
    );
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}

export async function registerUser(
  username: string,
  fullname: string,
  password: string,
  profile: string
) {
  try {
    const result = await db.execAsync(
      `INSERT INTO USERS(USERNAME,FULLNAME,PASSWORD,PROFILE) VALUES('${username}','${fullname}','${password}','${profile}')`
    );
    return {
      status: "success",
      data: { username, fullname, password, profile },
    };
  } catch (error) {
    console.log(error);
    return { status: "error", data: [] };
  }
}

export async function getUser(username: string) {
  try {
    const result = await db.getFirstAsync(
      `SELECT * FROM USERS WHERE USERNAME='${username}'`
    );
    return { status: "success", msg: "", data: result };
  } catch (error) {
    console.log(error);
    return { status: "error", msg: "Unkoun server error!", data: null };
  }
}

// export async function dropTable() {
//   try {
//     const result = await db.execAsync(`DROP TABLE USERS`);
//     return { status: "success", data: result };
//   } catch (error) {
//     console.log(error);
//     return { status: "error", data: [] };
//   }
// }
