export async function redirectGoogle(request, response) {
  try {
    console.log(request.user);
    response.send("callback URI");
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
}

export function logout(request, response) {
  response.send("logging out...");
}
