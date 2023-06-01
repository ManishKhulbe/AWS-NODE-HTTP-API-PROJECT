const AWS = require("aws-sdk");

const fetchSingleUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

  try {
    let result = await dynamodb
      .get({
        TableName: "UserTable",
        Key: { id },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};

module.exports = { handler: fetchSingleUser };
