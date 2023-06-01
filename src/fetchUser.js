const AWS = require("aws-sdk");

const fetchUsers = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    let results = await dynamodb
      .scan({
        TableName: "UserTable",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(results.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};

module.exports = { handler: fetchUsers };
