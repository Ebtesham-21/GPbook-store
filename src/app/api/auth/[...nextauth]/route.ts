import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcryptjs";
import connectDB from "@/utiils/db";
import User from "@/models/User";
