import { model, Schema } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../modules/User/user.types.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    age: Number,

    profileImage: {
      type: String,
    },
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
    },
    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.system,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.user,
    },
    bio: String,

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    confirmedAt: {
      type: Date,
    },
    blockedAt: Date,
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true, // __v

    toJSON: {
      virtuals: true,
      getters: true,
      transform(doc , ret){
        delete ret.id
        delete ret.password
        return ret
      }
    },
    toObject: {
      virtuals: true,
      getters: true,
      transform(doc , ret){
        delete ret.id
        delete ret.password
        return ret
      }
    },
    virtuals : {
        fullname : {
            get(){
                return this.firstName + " " + this.lastName
            },
            set(value){
                const [firstName, lastName] = value.split(" ")
                if(!firstName || !lastName){
                    throw new Error("in-valid fullname")
                }
                this.set("firstName", firstName)
                this.set("lastName", lastName)
            }

        }
    }
  },
);

export const userModel = model("User", userSchema);

