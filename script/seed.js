'use strict';

const {
  db,
  models: { User, Post, Comment },
} = require('../server/db');
const Match = require('../server/db/models/Match');
const Message = require('../server/db/models/Message');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Creating Users
  const [cody, murphy, tiffany, laura, kai] = await Promise.all([
    User.create({
      username: 'cody',
      name: 'Cody',
      lastName: 'Wilson',
      password: '123',
      imageUrl: '../../man1.jpg',
      gender: 'male',
      interest: 'female',
      hobbies: ['Fishing', 'Skiing', 'brewing my own beer'],
    }),
    User.create({
      username: 'murphy',
      name: 'Murphy',
      lastName: 'Manzer',
      password: '123',
      imageUrl: '../../man2.jpeg',
      gender: 'male',
      interest: 'female',
      hobbies: ['Good music', 'Wine', 'Making people laugh'],
    }),
    User.create({
      username: 'tiffany',
      name: 'Tiffany',
      lastName: 'Collins',
      password: '123',
      imageUrl: '../../woman1.jpg',
      gender: 'female',
      interest: 'male',
      hobbies: ['Web development', 'Cooking', 'Wine'],
    }),
    User.create({
      username: 'laura',
      name: 'Laura',
      lastName: 'Soprano',
      password: '123',
      imageUrl: '../../woman2.jpg',
      gender: 'female',
      interest: 'male',
      hobbies: ['Paragliding', 'Biking', 'Cooking'],
    }),
    User.create({
      username: 'kai',
      name: 'Kai',
      lastName: 'Sanders',
      password: '123',
      imageUrl: '../../man3.jpg',
      gender: 'male',
      interest: 'female',
      hobbies: ['Painting', 'Visiting museums'],
    }),
  ]);

  //Creating posts
  const [post1, post2] = await Promise.all([
    Post.create({
      text: 'I just watched an amazing movie-Godfather!!!',
      imageUrl: '../../godfather.jpg',
      likes: [1, 2, 3, 4],
      userId: murphy.id,
    }),
    Post.create({
      text: 'Weather is perfect for a walk by the water',
      imageUrl: '../../river.jpg',
      likes: [1, 2, 3, 4, 5],
      userId: tiffany.id,
    }),
  ]);

  //Creating comments
  const [comment1, comment2, comment3] = await Promise.all([
    Comment.create({
      text: 'Just when I thought I was out, they pull me back in!',
      likes: 10,
      userId: laura.id,
      postId: post1.id,
    }),
    Comment.create({
      text: 'My favorite movie!',
      likes: 4,
      userId: cody.id,
      postId: post1.id,
    }),
    Comment.create({
      text: "You are right, it's beautiful today",
      likes: 4,
      userId: kai.id,
      postId: post2.id,
    }),
  ]);

  //Creating matches
  const [match1, match2] = await Promise.all([
    Match.create({
      user1Id: tiffany.id,
      user2Id: murphy.id,
    }),
    Match.create({
      user1Id: laura.id,
      user2Id: cody.id,
    }),
  ]);

  //Creating messages

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
