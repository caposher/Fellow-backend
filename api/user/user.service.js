const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

const temp = [
  {
    fullname: 'Robin Woods',
    username: 'bluebird535',
    password: 'deadpool',
    imgUrl: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
  {
    fullname: 'Daniel Hughes',
    username: 'smallduck899',
    password: 'music1',
    imgUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
  {
    fullname: 'Brandon Bailey',
    username: 'bigpeacock932',
    password: 'mollie',
    imgUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    fullname: 'Peter Hicks',
    username: 'brownbutterfly691',
    password: 'rrrrrr',
    imgUrl: 'https://randomuser.me/api/portraits/men/80.jpg',
  },
  {
    fullname: 'Jane Hill',
    username: 'yellowladybug184',
    password: 'herewego',
    imgUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
  },
  {
    fullname: 'Ashley Carroll',
    username: 'redswan501',
    password: 'grizzly',
    imgUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    fullname: 'Bernard Miller',
    username: 'whiteostrich566',
    password: 'lolo',
    imgUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
  },
  {
    fullname: 'Jonathan Peck',
    username: 'lazypeacock761',
    password: 'proxy',
    imgUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
  },
  {
    fullname: 'Yvonne Carroll',
    username: 'organicdog552',
    password: 'vantage',
    imgUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
  },

  {
    fullname: 'Rick Bailey',
    username: 'silvermouse583',
    password: 'dana',
    imgUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
  },

  {
    username: 'demo',
    password: '$2b$10$BmTfeaX0onLYIgx7n5A4Ee1fhKQjs4J8OTyF6cv73GvylqzJwXE1O',
    fullname: 'Demo',
    isAdmin: false,
  },

  {
    username: 'oshra1996@gmail.com',
    fullname: 'Oshra Hartuv',
    isAdmin: false,
    imgUrl:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=6981276221882783&height=50&width=50&ext=1641824320&hash=AeT7LZzRphRqsDLgo9E',
    googleUser: false,
    fbUser: true,
  },
  {
    username: 'oshrartuv@gmail.com',
    fullname: 'Oshra Hartuv',
    isAdmin: false,
    imgUrl: 'https://lh3.googleusercontent.com/a/AATXAJx0fbVFZO1JRmplZlnJhO25Cx2dRBnrC0uTmFVQ=s96-c',
    googleUser: true,
    fbUser: false,
  },

  {
    username: 'adamberco@gmail.com',
    fullname: 'אדם ברקוביץ',
    isAdmin: false,
    imgUrl: 'https://res.cloudinary.com/oshra/image/upload/v1638867158/ohpwye1f7oidmqy7cujl.jpg',
    googleUser: true,
    fbUser: false,
  },
  {
    username: 'caposher@gmail.com',
    fullname: 'osher cappelli',
    isAdmin: false,
    imgUrl: 'https://lh3.googleusercontent.com/a-/AOh14GjgU1phKJ8jIc0OyTQc94j5vbKRyg0442zOBYlYMg=s96-c',
    googleUser: true,
    fbUser: false,
  },
  {
    username: 'osher@gmail.com',
    password: '$2b$10$1urGSEL74IjHnFe8edAWP.AEdcpdmp1XBSuB.6zBSb6ShVwIgq3B6',
    fullname: 'osher',
    isAdmin: false,
    imgUrl: 'https://lh3.googleusercontent.com/a-/AOh14GjgU1phKJ8jIc0OyTQc94j5vbKRyg0442zOBYlYMg=s96-c',
  },

  {
    username: 'oh',
    password: '$2b$10$jaSgk2Sq.J.5CXYFIMTINerETERawCnKFhIORa8szNce/OeyEncF6',
    fullname: 'Oshra Hartuv',
    isAdmin: false,
    imgUrl:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=6981276221882783&height=50&width=50&ext=1641824320&hash=AeT7LZzRphRqsDLgo9E',
  },
  {
    username: 'tomchick30@gmail.com',
    fullname: 'Tom Bechar',
    isAdmin: false,
    imgUrl: 'https://lh3.googleusercontent.com/a-/AOh14GgAABQ-TJN_BHCNhELiJiFYcPn-yz7wogFnLn2Qsg=s96-c',
    googleUser: true,
    fbUser: false,
  },
  {
    username: 'adamBercovich@walla.com',
    fullname: 'Adam Bercovich',
    isAdmin: false,
    imgUrl:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10223751747794266&height=50&width=50&ext=1641968802&hash=AeREjgrGEyuPLbrAf98',
    googleUser: false,
    fbUser: true,
  },

  {
    username: null,
    fullname: null,
    isAdmin: false,
    imgUrl: 'https://lh3.googleusercontent.com/a/AATXAJwfUhpckEmemDgBn9OsQUgLqL-3MVMynAFWfGHu=s96-c',
    googleUser: true,
    fbUser: false,
  },
];

module.exports = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
  addExternalUser,
};

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  try {
    const collection = await dbService.getCollection('user');
    var users = await collection.find(criteria).toArray();
    users = users.map((user) => {
      delete user.password;
      // user.isHappy = true
      // user.createdAt = ObjectId(user._id).getTimestamp()
      // Returning fake fresh data
      // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
      return user;
    });

    // await collection.insertMany(temp);
    return users;
  } catch (err) {
    logger.error('cannot find users', err);
    throw err;
  }
}

async function getById(userId) {
  try {
    query();
    const collection = await dbService.getCollection('user');
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;
    return user;
  } catch (err) {
    logger.error(`while finding user ${userId}`, err);
    throw err;
  }
}
async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection('user');
    const user = await collection.findOne({ username });
    return user;
  } catch (err) {
    logger.error(`while finding user ${username}`, err);
    throw err;
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('user');
    await collection.deleteOne({ _id: ObjectId(userId) });
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err);
    throw err;
  }
}

async function update(user) {
  try {
    // peek only updatable fields!
    const userToSave = {
      _id: ObjectId(user._id),
      username: user.username,
      fullName: user.fullname,
    };
    const collection = await dbService.getCollection('user');
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
    return userToSave;
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}

async function add(user) {
  try {
    // peek only updatable fields!
    const userToAdd = {
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      isAdmin: false,
    };
    const collection = await dbService.getCollection('user');
    await collection.insertOne(userToAdd);
    return userToAdd;
  } catch (err) {
    logger.error('cannot insert user', err);
    throw err;
  }
}
async function addExternalUser(user) {
  try {
    // peek only updatable fields!
    const userToAdd = {
      username: user.username,
      fullname: user.fullname,
      isAdmin: false,
      imgUrl: user.imgUrl,
      googleUser: user.googleUser,
      fbUser: user.fbUser,
    };
    console.log('userToAdd', userToAdd);
    const collection = await dbService.getCollection('user');
    await collection.insertOne(userToAdd);
    return userToAdd;
  } catch (err) {
    logger.error('cannot insert user', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
    criteria.$or = [
      {
        username: txtCriteria,
      },
      {
        fullName: txtCriteria,
      },
    ];
  }
  if (filterBy.minBalance) {
    criteria.balance = { $gte: filterBy.minBalance };
  }
  return criteria;
}
