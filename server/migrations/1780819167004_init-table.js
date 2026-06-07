/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Create users table
  pgm.createTable("users", {
    id: "id",
    username: {
      type: "varchar(50)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create absences table
  pgm.createTable("absences", {
    id: "id",
    nama: {
      type: "varchar(100)",
      notNull: true,
    },
    alamat: {
      type: "text",
      notNull: true,
    },
    jenis_kelamin: {
      type: "char(1)",
      notNull: true,
      check: "jenis_kelamin IN ('L', 'P')",
    },
    tanggal_absen: {
      type: "date",
      notNull: true,
    },
    jam_masuk: {
      type: "time",
      notNull: true,
    },
    jam_keluar: {
      type: "time",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create indices for better query performance
  pgm.createIndex("absences", "nama");
  pgm.createIndex("absences", "tanggal_absen");
  pgm.createIndex("absences", "created_at");
};

exports.down = (pgm) => {
  pgm.dropTable("absences");
  pgm.dropTable("users");
};
