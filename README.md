# Finfluencer Court

ZUNO product context

You are building one module of a larger product called ZUNO.

ZUNO is a financial decision-training app for young people. It sits between financial hype and action. The user tells ZUNO what they are thinking of doing, ZUNO helps them understand the downside and risk of that decision, then helps them explore a different way of achieving the same underlying goal.

ZUNO is not an investment recommendation app. It does not tell users what to buy or sell. Its purpose is to teach users how to think about risk, concentration, speculation and diversification before acting.

The overall ZUNO journey is:

DECLARE → STRESS TEST → ALTERNATIVE → LEARN

The existing first module covers:

DECLARE + STRESS TEST

This project is responsible for:

ALTERNATIVE

The next module will be:

LEARN / Finfluencer Court

The Fan Portfolio

The Fan Portfolio is ZUNO's unique selling point.

The idea is that someone may be attracted to a financial opportunity because they care about something — for example sport — without needing to put everything behind one company, asset, prediction or outcome.

ZUNO therefore lets the user explore a simulated diversified portfolio built around the broader sports and entertainment ecosystem.

The purpose is NOT to say:

“This is what you should invest in.”

The purpose is to demonstrate:

“There are different ways to express the same financial belief, and diversification changes how dependent you are on one prediction.”

The Fan Portfolio should therefore teach the difference between:

Concentration → one prediction / one outcome / one exposure

versus

Diversification → multiple exposures / less dependence on one prediction

Use simulated, illustrative data rather than live markets or real investment recommendations.

Important product principle

The Fan Portfolio should NOT simply look like a “better portfolio”.

It should not imply that diversification guarantees higher returns or removes risk.

The educational message is:

Diversification doesn't remove risk. It can change how much the outcome depends on one prediction.

Prototype scope

This is a hackathon MVP.

Use hard-coded scenarios and simulated data.

Do NOT build:

live financial data

brokerage functionality

actual trading

personalised investment recommendations

complex backend infrastructure

LLM functionality

Focus on making the Fan Portfolio experience visually compelling, interactive and educational.

The final product will eventually combine this module with the existing ZUNO Stress Test module and the later Finfluencer Court module.## Existing ZUNO reference

Before building anything, inspect the existing ZUNO prototype:

https://think-before-you-win.lovable.app/

This is the canonical ZUNO UX and visual reference.

Also treat the Fan Portfolio module as an existing ZUNO module that this experience will eventually connect to:

`/portfolio`

Build this module as part of the same application, not as a separate product.

The new module should eventually live at:

`/court`

Keep the existing ZUNO design language, branding, typography, spacing, rounded cards, button treatment and overall visual quality.

The existing product currently uses a dark theme. Keep that theme.

The Finfluencer Court can have a more energetic and playful personality than the Stress Test and Fan Portfolio, but it must still clearly feel like ZUNO.

---

# Finfluencer Court

Finfluencer Court is ZUNO's **learning engine**.

The purpose is not simply to fact-check social-media claims.

The user should have to **make their own judgement first**, before ZUNO reveals the reasoning.

The core loop is:

**SEE THE CLAIM → MAKE A JUDGEMENT → COMMIT → REVEAL → LEARN → TRY AGAIN**

The user sees a fictional viral financial claim.

They must decide whether it is:

**LEGITIMATE**

**RISKY**

or

**MISLEADING**

Only after they commit should ZUNO reveal the outcome and explain why.

The objective is to train the user to recognise poor financial reasoning themselves.

---

# Screen 1 — Court Introduction

Create an energetic introduction screen.

Headline:

**Welcome to Finfluencer Court**

Supporting text:

**The internet is full of financial advice. Can you spot what's actually risky?**

Then explain the rules:

**You'll see a claim.**

**Make your judgement.**

**Then we'll reveal what you missed.**

Primary CTA:

**Enter the Court**

This should feel like entering a challenge rather than reading an educational article.

---

# Screen 2 — The Claim

Create the core Finfluencer Court interface.

Show a realistic-looking fictional social-media financial post.

It should resemble something a young person might actually encounter online.

Example:

> **“I've made 300% this year doing this.
> This crypto is going to 10x before the end of the month.
> Don't miss it.”**

Display fictional creator information such as:

**@MarketKing**

**128K followers**

Use a small “Sponsored” or “Trending” style indicator if appropriate, but make it clear that this is a simulated claim.

Underneath the post:

**What's your judgement?**

Provide three large decision buttons:

**LEGITIMATE**

**RISKY**

**MISLEADING**

Do NOT reveal the correct answer before the user chooses.

Once the user selects an answer, lock the decision in.

Then show:

**Decision locked.**

and transition to the reveal.

---

# Screen 3 — Verdict Reveal

Create a visually satisfying reveal animation.

Example:

**VERDICT**

### MISLEADING

Then show:

**You chose: Risky**

or

**You chose: Misleading**

depending on the scenario.

If they were correct:

**Good call. You spotted the warning signs.**

If incorrect:

**Not quite. Let's break down what you missed.**

Avoid shaming the user.

The goal is learning.

---

# Screen 4 — Why?

This is the most important educational section.

Break the claim down into several reasoning cards.

For example:

### Unrealistic certainty

The creator presents a future price as if it were guaranteed.

### FOMO

The language creates urgency and fear of missing out.

### Missing downside

The post highlights potential gains without explaining possible losses.

### Cherry-picked evidence

A past return is used to imply that future performance is predictable.

Each card should be visually distinct and easy to understand.

Do not overwhelm the user with finance jargon.

The explanation should teach a principle that the user can recognise in future situations.

---

# Screen 5 — What should you have noticed?

Create a summary screen.

Headline:

**The warning signs**

Show 3–4 memorable signals from the previous claim.

Examples:

**Guaranteed returns**

No legitimate investment can guarantee this outcome.

**Urgency**

“Don't miss out” is designed to trigger a quick decision.

**Upside without downside**

The potential gain is emphasised while the risks are ignored.

**Influencer authority**

A large following does not make financial claims accurate.

Then show:

**The skill you just practised:**

**Question the reasoning, not the hype.**

---

# Screen 6 — Try Another

This is essential to the learning methodology.

Do NOT simply end after explaining the first claim.

Introduce another fictional financial claim testing the SAME underlying concept in a different context.

For example, if the first scenario tested FOMO, the next one might be:

> **“Everyone is buying this stock before earnings. Analysts are saying it can't lose. Get in before the announcement.”**

Ask the user to make the decision again:

**LEGITIMATE**

**RISKY**

**MISLEADING**

The user should not know that the underlying concept is being repeated.

The purpose is to test whether they have actually learned the principle.

---

# Screen 7 — Score / Risk Recognition

After several questions, display a simple performance summary.

Example:

**Risk Recognition Score**

**3 / 4**

Then show category strengths.

Example:

FOMO recognition — Strong
Guaranteed returns — Strong
Missing downside — Improving
Influencer authority — Improving

This should NOT feel like an academic exam.

Make it feel like a game/progression system.

Use encouraging language such as:

**You're getting better at spotting the signals.**

Avoid creating a harsh failure state.

---

# Screen 8 — Final takeaway

End with:

**The goal isn't to know every investment.**

**It's to recognise bad reasoning before you act.**

Then explain:

**The next time you see a viral financial claim, pause and ask:**

**Where's the evidence?**

**Where's the downside?**

**Why am I being rushed?**

**What am I not being told?**

Primary CTA:

**Back to ZUNO**

Secondary option:

**Play Again**

---

# Gamification

Finfluencer Court should feel more interactive and entertaining than a traditional financial education tool.

Include lightweight gamification such as:

- progress through rounds
- animated verdict reveal
- score updates
- streak/progression indicator
- subtle celebratory animation after correct answers
- clear feedback after incorrect answers

Do NOT introduce excessive game mechanics, leaderboards or meaningless points.

The learning should remain the centre of the experience.

---

# Scenario system

Create a small hard-coded scenario dataset so additional claims can easily be added later.

Each scenario should contain:

- claim text
- fictional creator name
- follower count
- verdict
- explanation
- warning signs
- underlying financial concept
- difficulty level

Create at least **5 example scenarios**.

Use different financial themes such as:

1. Guaranteed crypto returns
2. FOMO around an individual stock
3. “Passive income” claim
4. Celebrity/influencer endorsement
5. Leveraged investment claim

Keep all claims fictional and clearly part of a simulated educational experience.

---

# Important educational principle

Finfluencer Court should NOT teach:

**“Social media = bad.”**

It should teach:

**“A claim should be evaluated based on its reasoning and evidence, not its popularity.”**

A creator can be correct.

A creator can be wrong.

A large following does not prove either.

The user should learn to evaluate:

- evidence
- certainty
- incentives
- downside
- urgency
- concentration
- leverage
- omitted information

---

# Visual direction

This should be the most distinctive module while remaining unmistakably ZUNO.

Use subtle visual references to a courtroom/game environment:

- “CASE #001”
- “EVIDENCE”
- “VERDICT”
- “WARNING SIGN”
- “DECISION LOCKED”

Do NOT make it look like a literal legal application.

Instead, combine:

**social-media aesthetics + game mechanics + premium fintech design**

The user's attention should be immediately drawn to:

1. The claim
2. Their decision
3. The reveal
4. The reasoning

Keep the interface clean and highly legible.

---

# Technical requirements

Use React and reusable components.

Create reusable components for:

- ClaimCard
- VerdictButton
- DecisionLock
- VerdictReveal
- WarningSignCard
- ScenarioProgress
- ScoreCard
- LearningTakeaway
- CTA buttons

Store the scenarios in a simple local data structure so they can easily be edited or expanded.

Use static data only.

Do NOT implement:

- real social-media APIs
- live financial information
- LLM functionality
- authentication
- user accounts
- complex backend infrastructure
- real fact-checking APIs

The claims and educational explanations are predefined for the prototype.

Create the module at:

`/court`

The final CTA should allow the user to return to the main ZUNO experience.

The module should eventually fit into this overall ZUNO journey:

**DECLARE → STRESS TEST → FAN PORTFOLIO → FINFLUENCER COURT**

The final experience should leave the user thinking:

**“Next time I see financial hype online, I know what questions to ask.”**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/825d6c08-7509-43da-8d0b-c3383e84ba8b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
