// import prisma from "@/libs/prisma";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const content = await prisma.blog.findMany();
//       const item = await prisma.item.findMany();

//       const details = content.map((blog)=>{
//        const currentItems = item.filter(items=>items.contentId === blog.id)
//         if(currentItems?.[0]?.contentId === blog?.id)
//         return{
//           ...blog,
//           items:currentItems,
//         }
//       })

//       res.status(200).json({ message: "Blogs fetched successfully", data: details });
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       res.status(500).json({ error: "Failed to fetch blogs" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }

import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Validate the Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }

      // Fetch blogs and items
      const blogs = await prisma.blog.findMany();
      const items = await prisma.item.findMany();

      // Map blogs to their respective items
      const details = blogs.map((blog) => {
        const relatedItems = items.filter((item) => item.contentId === blog.id);
        return {
          ...blog,
          items: relatedItems,
        };
      });

      res.status(200).json({ message: "Blogs fetched successfully", data: details });
    } catch (error) {
      console.error("Error fetching blogs:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to fetch blogs. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
