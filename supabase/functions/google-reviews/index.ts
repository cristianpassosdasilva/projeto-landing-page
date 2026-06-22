// Supabase Edge Function: proxies the Google Places API (New) "Place Details".
// Keeps the Google API key on the server; the browser never sees it.
//
// Secrets required (set with `supabase secrets set`):
//   GOOGLE_PLACES_API_KEY  -> the API key created in Google Cloud Console
//   GOOGLE_PLACE_ID        -> the Place ID of the business
//
// Google always caps this endpoint at 5 reviews, chosen by Google as "most
// relevant" — there is no supported parameter to sort or request more.
//
// Deploy with: supabase functions deploy google-reviews

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY")
  const placeId = Deno.env.get("GOOGLE_PLACE_ID")

  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID não configurados." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }

  const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`)
  url.searchParams.set("languageCode", "pt-BR")

  try {
    const googleResponse = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,rating,userRatingCount,reviews",
      },
    })
    const data = await googleResponse.json()

    if (!googleResponse.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message || `Google respondeu: ${googleResponse.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const reviews = (data.reviews || []).map((review) => ({
      id: `${review.authorAttribution?.displayName}-${review.publishTime}`,
      authorName: review.authorAttribution?.displayName,
      authorPhoto: review.authorAttribution?.photoUri,
      rating: review.rating,
      text: review.text?.text,
      relativeTime: review.relativePublishTimeDescription,
      time: review.publishTime,
    }))

    return new Response(
      JSON.stringify({
        rating: data.rating,
        userRatingsTotal: data.userRatingCount,
        reviews,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})
