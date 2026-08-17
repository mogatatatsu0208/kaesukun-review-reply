const $ = (id) => document.getElementById(id);

const openings = {
  warm: ["うれしい口コミをありがとうございます。", "ご来店と温かいお言葉、ありがとうございます！"],
  formal: ["このたびはご来店いただき、誠にありがとうございます。", "貴重なご感想をお寄せいただき、心より御礼申し上げます。"],
  short: ["ご来店と口コミの投稿、ありがとうございます。", "口コミをお寄せいただき、ありがとうございます。"]
};

const closings = {
  "美容室": "また髪のお悩みやご希望がございましたら、いつでもご相談ください。次回のご来店も心よりお待ちしております。",
  "整体・接骨院": "今後も状態を確認しながら、安心してお過ごしいただけるよう丁寧に対応いたします。",
  "飲食店": "これからも気持ちよくお食事いただける店づくりに努めます。またのご来店をお待ちしております。",
  "その他の店舗": "これからも安心してご利用いただけるよう努めてまいります。またのご来店をお待ちしております。"
};

function safeExcerpt(text) {
  const clean = text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  if (!clean) return "ご感想";
  return `「${clean.slice(0, 34)}${clean.length > 34 ? "…" : ""}」とのお言葉`;
}

function buildReply() {
  const review = $("review").value.trim();
  const rating = Number($("rating").value);
  const industry = $("industry").value;
  const tone = $("tone").value;
  const shop = $("shop").value.trim();
  if (!review) return alert("口コミ本文を入力してください。");
  if (!$("fact").checked) return alert("公開前の事実確認への同意をチェックしてください。");

  const opening = openings[tone][Math.floor(Math.random() * openings[tone].length)];
  const name = shop ? `${shop}です。` : "";
  let body;
  let warning = "";
  if (rating >= 4) {
    body = `${safeExcerpt(review)}をいただき、スタッフ一同とても励みになります。`;
  } else if (rating === 3) {
    body = `${safeExcerpt(review)}を真摯に受け止め、よりご満足いただけるよう改善に努めます。`;
  } else {
    body = `ご期待に沿えず、残念なお気持ちにさせてしまったことを重く受け止めております。いただいた内容を店内で確認し、改善に努めます。差し支えなければ、状況を確認するため店舗の公式窓口へご連絡いただけますと幸いです。`;
    warning = "低評価への返信です。公開前に、反論・個人情報・責任や返金の断定が入っていないか確認してください。事実関係の争いは公開欄で続けず、公式窓口へ誘導してください。";
  }
  const ending = rating <= 2 ? "このたびは貴重なご意見をお寄せいただき、ありがとうございました。" : closings[industry];
  $("output").textContent = `${name}${opening}\n${body}\n${ending}`;
  $("warning").innerHTML = warning ? `<div class="warning">${warning}</div>` : "";
  $("result").style.display = "block";
  $("result").scrollIntoView({behavior:"smooth", block:"start"});
}

$("generate").addEventListener("click", buildReply);
$("retry").addEventListener("click", buildReply);
$("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText($("output").textContent);
  $("copy").textContent = "コピーしました";
  setTimeout(() => $("copy").textContent = "コピーする", 1400);
});
  
