export async function GET() {
    return new Response(JSON.stringify({ message: "Seed route working!" }), {
      status: 200,
    });
  }
