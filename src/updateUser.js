const AWS = require("aws-sdk");

const updateUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { isActive} = JSON.parse(event.body);
    const { id } = event.pathParameters;


  await dynamodb
    .update({
      TableName: "UserTable",
      Key: { id },
      UpdateExpression: "set isActive =:isActive",
      ExpressionAttributeValues: {
        ":isActive": isActive,
        },
      ReturnValues:"ALL_NEW"
    })
    .promise();

  return {
    statusCode: 200,
      body: JSON.stringify({
        msg:"User updated Successfully"
    }),
  };
};

module.exports = { handler: updateUser };
