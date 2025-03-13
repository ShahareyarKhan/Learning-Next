export async function GET(req: Request) {
    return new Response(JSON.stringify({ message: "Seed route working!" }), {
      status: 200,
    });
  }
