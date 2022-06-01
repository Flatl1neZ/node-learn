require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true},
  age: Number,
  favoriteFoods: [String]
}) 

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let lucasMon = new Person({
    name: "Lucas Monteiro Camargo", 
    age: 20, 
    favoriteFoods: ["eggs", "fresh fruit"]});
  
  lucasMon.save(function(err, data){
  if(err) return console.error(err);
   done(null, data);
});
};

let arrayOfPeople = [
  {name: "Glaucia Monteiro", age: 40, favoriteFoods: ["coca", "beans"]},
  {name: "Benicio Telles", age: 2, favoriteFoods: ["pizza", "pasta"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.log(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound){
    if(err)  return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound){
    if(err) return console.log(err);
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, idFound){
    if(err) return console.log(err);
    done(null, idFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
    Person.findById(personId, (err, person)=>{
      if(err) return console.log(err);
    

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson)=>{
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) =>{
    if(err) return console.log(err);
    done(null, updatedDoc)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removed)=>{
    if(err) return console.log(err);
    done(null, removed);
  })
};

const removeManyPeople = (done) => {
  var nameToRemove = "Mary";
   Person.remove({name: nameToRemove}, (error, removalInfo) => {
      if(error) return console.log(error);
     done(null, removalInfo);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select("-age")
  .exec(function(err, people){
    done(null, people);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
