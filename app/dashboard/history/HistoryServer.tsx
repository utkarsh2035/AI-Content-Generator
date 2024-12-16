// app/dashboard/history/HistoryServer.tsx
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm"; // Ensure this import is correct
import { currentUser  } from "@clerk/nextjs/server";
import Templates from "@/app/(data)/Templates";
import History, { HISTORY } from "./History"; // Import the Client Component and HISTORY interface

const HistoryServer = async () => {
  const user = await currentUser ();

  // Ensure user is defined before querying the database
  if (!user) {
    return <div>No user found</div>; // Handle the case where no user is found
  }
  if (!user?.primaryEmailAddress?.emailAddress) {
    return <div>No user found</div>; // Handle the case where no user is found
  }
  const historyData: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress)) // Ensure this is correct
    .orderBy(desc(AIOutput.id));

  return <History historyData={historyData} />;
};

export default HistoryServer;