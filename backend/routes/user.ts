import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router();
const prisma = new PrismaClient();

export interface IUSER {
  username: string;
  email: string;
  password: string;
}

export interface ILOGIN {
  email: string;
  password: string;
}

userRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true },
    }); // Assuming you have a User model for fetching users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new user
userRouter.post("/", async (req: Request, res: Response) => {
  const { username, email, password }: IUSER = req.body;

  try {
    // Hash the password before storing it

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({
      message: "Error creating user",
    });
  }
});

// Login an existing user
userRouter.post("/login", async (req: Request, res: any) => {
  const { email, password }: ILOGIN = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email }, // exclude password
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({
      message: "Error logging in",
    });
  }
});

// Get all users
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true }, // exclude password
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error retrieving users",
    });
  }
});

// Get a single user by ID
userRouter.get("/:id", async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id }, // Ensure ID is parsed as an integer
      select: { id: true, username: true, email: true }, // exclude password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error retrieving user",
    });
  }
});

// Update user by ID
userRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password }: IUSER = req.body;

  try {
    const updatedData: any = { username, email };

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updatedData,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error updating user",
    });
  }
});

// Delete user by ID
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: id },
    });

    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error deleting user",
    });
  }
});

export default userRouter;
