const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { name, email } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();
  try {
    const newUser = {
      id,
      createdAt,
      name,
      email,
      isActive: true,
    };

    await dynamodb
      .put({
        TableName: "UserTable",
        Item: newUser,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler: addUser };
