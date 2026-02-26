export async function POST(request) {
  try {
    const { query, variables } = await request.json();

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      throw new Error(`LeetCode API responded with ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('LeetCode proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
}
