const mongoose = require('mongoose');
const Card = require("../models/card-model");
const List = require("../models/list-model");
const Backlog = require("../models/backlog-model");

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
        priority: 1,
        stability: true,
        legalLiability: "Recommended",
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

//----------------------------------------------------------

const addCardToBacklog = async (req, res, next) => {
  const { text, positionInBacklog, backlogRef } = req.body;

  console.log("Backlog to which Card is adding: ", backlogRef);

  let card;
  try {
    // 1. save a new card to db
    const cardSaveResult = await Card.create([
      {
        id: 0,
        requirement: text,
        version: 0,
        backlogRef: mongoose.Types.ObjectId(backlogRef),
        positionInBacklog: 0,
        notes: "-Enter your notes here-",
        priority: 1,
        stability: true,
        legalLiability: "Recommended",
      }
    ]);

    card = cardSaveResult[0];

    console.log("cardSaveResult[0]._id:");
    console.log(cardSaveResult[0]._id);

    // 2. add its reference to the backlog it is added to
    try{
      console.log("Finding backlog and adding card ref...");
      await Backlog.findByIdAndUpdate(
        mongoose.Types.ObjectId(backlogRef),
        {"$push": {"cardsRef": cardSaveResult[0]._id}},
      );
      console.log("added cardRef...?");
    }
    catch (err) {
      console.log("Error adding cardRef to Backlog: ");
      console.log(err);
    }
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
//----------------------------------------------------------

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

    // 3. delete all its Cross References from other requirements
    try{
      console.log("Finding requirement references and deleting Cross References...");
      await Card.updateMany(
        {"$pull": {"crossReferences": mongoose.Types.ObjectId(deletedCard._id)}},
      );
      console.log("deleted cross reference...?");
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

const updateCard = async (req, res, next) => {
  console.log("<---ENTERED UPDATECARD--->");
  console.log(req.body);
  const { card } = req.body;

  // convert to JSON
  // var cardJson = JSON.parse(card);

  // console.log("BEFORE cardJson: ");
  // console.log(cardJson);

  // delete cardJson["_id"];
  // delete cardJson["listRef"];

  // console.log("AFTER cardJson: ");
  // console.log(cardJson);


  // var cardJsonWithObjecId = cardJson.map(query => ({
  //     $match: {
  //         ...query.$match,
  //         _id: ObjectId(query.$match._id)
  //     }
  // }));

  // cardJson._id = mongoose.Types.ObjectId(cardJson._id);
  // cardJson.listRef = mongoose.Types.ObjectId(cardJson.listRef);

  let updatedCard;
  try {
    // Update list card
    updatedCard = await Card.findByIdAndUpdate(
      mongoose.Types.ObjectId(card._id),
      card,
      { new: true, upsert: true }
    )
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Card didnt update :(" });
  }
  console.log("Card updated successfully!");
  return res.status(200).json({ updatedCard });
}

const addCrossReference = async (req, res, next) => {
  console.log("<---ENTERED addCrossReference--->");
  console.log(req.body);
  const { referenceItem, selectedRequirement } = req.body;

  let updatedCard;
  try {
    // Update crossReferences of card
    updatedCard = await Card.findByIdAndUpdate(
      mongoose.Types.ObjectId(selectedRequirement._id),
      selectedRequirement,
      { new: true, upsert: true }
    )
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Card didnt update :(" });
  }
  console.log("Card updated successfully!");
  return res.status(200).json({ updatedCard });
}

const deleteCrossReference = async (req, res, next) => {
  console.log("<---ENTERED deleteCrossReference--->");
  console.log(req.body);
  const { referenceItem, selectedRequirement } = req.body;

  let updatedCard;
  try {
    // Update crossReferences of card
    updatedCard = await Card.findByIdAndUpdate(
      mongoose.Types.ObjectId(selectedRequirement._id),
      {"$pull": {"crossReferences": mongoose.Types.ObjectId(referenceItem._id)}},
      { new: true, upsert: true }
    )
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Card didnt update :(" });
  }
  console.log("Card updated successfully!");
  return res.status(200).json({ updatedCard });
}

exports.addCard = addCard;
exports.addCardToBacklog = addCardToBacklog;
exports.deleteCard = deleteCard;
exports.updateCard = updateCard;
exports.addCrossReference = addCrossReference;
exports.deleteCrossReference = deleteCrossReference;
