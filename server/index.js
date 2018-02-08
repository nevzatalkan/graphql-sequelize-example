'use strict';

const {
  getSchema
} = require('graphql-sequelize-crud');
const Sequelize = require('sequelize');
const express = require('express');
const graphqlHTTP = require('express-graphql');

var cors = require('cors')

const app = express();
const sequelize = new Sequelize('sikke_development', 'ottoman', 'Crocodile87*1', {
  // sqlite! now!
  dialect: 'mysql',

  // the storage engine for sqlite
  // - default ':memory:'
  // storage: 'path/to/database.sqlite'

  // disable logging; default: console.log
  // logging: false

});

const Kullanici = sequelize.define('kullanici', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

const Doviz = sequelize.define('doviz', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kod: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

const Personel = sequelize.define('personel', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  gorev: {
    type: Sequelize.STRING,
    allowNull: false
  },
  kullaniciid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

const Urun = sequelize.define('urun', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  alisFiyati: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  satisFiyati: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dovizid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

const Stok = sequelize.define('stok', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  adet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  urunid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

const Hareket = sequelize.define('hareket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  adet: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  urunid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dovizid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  kullaniciid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  islemtipi: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: true
});


Stok.hasMany(Urun, {
  as: 'urunler',
  foreignKey: 'urunid'
});
Personel.belongsTo(Kullanici, {
  as: 'kullanici',
  foreignKey: 'kullaniciid'
});

Urun.belongsTo(Doviz, {
  as: 'doviz',
  foreignKey: 'dovizid'
});

Hareket.hasMany(Urun, {
  as: 'urun',
  foreignKey: 'urunid'
});

Hareket.hasMany(Doviz, {
  as: 'doviz',
  foreignKey: 'dovizid'
});

// // belongsToMany
// User.belongsToMany(Todo, {
//   as: 'assignedTodos',
//   through: TodoAssignee
// });
// Todo.belongsToMany(User, {
//   as: 'assignees',
//   through: TodoAssignee
// });

sequelize.sync({
  force: true
})
.then(() => {

  const schema = getSchema(sequelize);
  
  app.use(cors());
  
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }));

  const port = 8085;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

});