const mongoose = require('mongoose');
const Card = require("../models/card-model");
const List = require("../models/list-model")

const addCard = async (req, res, next) => {
  const { text, position, listRef } = req.body;

  console.log("List to which Card is adding: ", listRef);

  let card;
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // 1. save a new list to db
    const cardSaveResult = await Card.create([
      {
        id: 0,
        requirement: text,
        version: 0,
        listRef: mongoose.Types.ObjectId(listRef),
        position: position,
        notes: "-Enter your notes here-",
      }
    ]);//,{ session });

    card = cardSaveResult[0];

    console.log("cardSaveResult[0]._id:");
    console.log(cardSaveResult[0]._id);

    // 2. add its reference to the list it is added to
    try{
      console.log("Finding list and adding card ref...");
      await List.findByIdAndUpdate(
        mongoose.Types.ObjectId(listRef),
        {"$push": {"cardsRef": cardSaveResult[0]._id}},
        // { session: session }
      );
      console.log("added cardRef...?");
    }
    catch (err) {
      console.log("Error adding cardRef to List: ");
      console.log(err);
    }

    // await session.commitTransaction();
    // session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error adding the Card");
    console.log(err);
    return res.status(404).json({ message: "Unable to Add Card" });
  }
  console.log("Card added successfully!");
  return res.status(200).json({ card });
};

const deleteCard = async (req, res, next) => {
  const { cardRef } = req.body;

  console.log("cardId of Card being deleted: ", cardRef);

  let deletedCard;
  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // 1. delete card from db
    try{
      console.log("Finding Card to delete...");
      deletedCard = await Card.findByIdAndDelete(
        mongoose.Types.ObjectId(cardRef),
        // { session: session }
      );
      console.log("deleted card...?");
    }
    catch (err) {
      console.log("Error deleting card from Cards: ");
      console.log(err);
    }

    // 2. delete its reference from the list it was added to
    try{
      console.log("Finding list and deleting card ref...");
      await List.findByIdAndUpdate(
        mongoose.Types.ObjectId(deletedCard.listRef),
        {"$pull": {"cardsRef": mongoose.Types.ObjectId(deletedCard._id)}},
        // { session: session }
      );
      console.log("deleted cardRef...?");
    }
    catch (err) {
      console.log("Error deleting cardRef from List: ");
      console.log(err);
    }

    // await session.commitTransaction();
    // session.endSession();
  }
  // catch and log error
  catch (err) {
    console.log("Error deleting the Card");
    console.log(err);
    return res.status(404).json({ message: "Unable to Delete Card" });
  }
  console.log("Card deleted successfully!");
  return res.status(200).json({ deletedCard });
};

exports.addCard = addCard;
exports.deleteCard = deleteCard;
