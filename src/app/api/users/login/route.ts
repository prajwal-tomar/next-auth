import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(reqBody);

    // checking if the user exists in the database or not
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log(user);

    // checking if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Password does not match. Please retry with correct password",
        },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    // Create the token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Creating the response
    const response = NextResponse.json({
      message: "Logged in successfully!!",
      success: true,
    });

    // Setting the cookie up
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    
    return response;

  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
