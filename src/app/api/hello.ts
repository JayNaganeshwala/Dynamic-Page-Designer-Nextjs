import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  try {
    // const reqBody = await request.json();
    // console.log("reqBody: ", reqBody);

    // const pages = await NextPage.find({});
    // console.log('pages: ', pages);

    return NextResponse.json(
      {
        message: "Page is successfully created",
        status: "success",
        pages: "pages",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
