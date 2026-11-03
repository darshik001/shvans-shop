import {register,onRegistered,} from "firebase/messaging";

import { messaging } from "./firebase";
import axios from "axios";

export const getDeviceToken = async () => {
  try {
    if (!("Notification" in window)) {
      throw new Error("Notifications are not supported");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      const unsubscribe = onRegistered(
        messaging,
        (installationId) => {
          unsubscribe();
          resolve(installationId);
        }
      );

      try {
        await register(messaging, {
          vapidKey: "BJ9rA0mIYGOm2eoQIY5w3CX3iUf_jf8Hl_TU4BZYEtWCW6NSdITn5CRY0Bz25Fa1CYyfbTdt1xWEh7ylwru0BiY",
        });
      } catch (error) {
        unsubscribe();
        reject(error);
      }
    });

  } catch (error) {
    console.error("Device registration error:", error);
    return null;
  }
};



