# Awesome WebMCP Sites [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Live websites that expose tools to AI agents with WebMCP, each one verified in a real browser and re-checked every week.

[![Verify listed sites](https://github.com/LF3551/awesome-webmcp-sites/actions/workflows/verify.yml/badge.svg)](https://github.com/LF3551/awesome-webmcp-sites/actions/workflows/verify.yml)

121 sites and 1121 tools, verified on 2026-10-28.

[WebMCP](https://github.com/webmachinelearning/webmcp) is a proposed web standard that lets a page register tools for AI agents: a name, a description, a JSON Schema and a function. An agent calls `search_products` instead of guessing which button to click. This list collects real sites that already do it, so you can see what good tools look like and test your agent against them.

## Contents

- [Why list your site](#why-list-your-site)
- [Check your site](#check-your-site)
- [Online shops and brands](#online-shops-and-brands)
- [Travel, events and local services](#travel-events-and-local-services)
- [Finance, jobs and business](#finance-jobs-and-business)
- [Developer platforms and docs](#developer-platforms-and-docs)
- [Tools and utilities](#tools-and-utilities)
- [Agent readiness and WebMCP tooling](#agent-readiness-and-webmcp-tooling)
- [Publications and personal sites](#publications-and-personal-sites)
- [Demos and playgrounds](#demos-and-playgrounds)
- [FAQ](#faq)

## Why list your site

- Developers building and testing agents look for live sites with real tools.
- A pull request with one line is merged automatically within minutes when the check passes.
- The weekly check tells you if your tools stop registering.

## Check your site

Open your page in Chrome with WebMCP enabled and run this in the console:

```js
await document.modelContext.getTools();
```

If it lists your tools, the page is ready for this list. For plain forms, add `toolname` and `tooldescription` attributes to the `<form>`. Tools must register when the page loads: a tool that appears only after a click is not detected. Add your site with a one-line pull request; the steps are in the contributing guide.

## Online shops and brands

- [Allbirds](https://www.allbirds.com/) - Shoes and clothing store; agents can search the catalog, browse the store and read product details.
- [Alo Yoga](https://www.aloyoga.com/) - Yoga clothing and accessories store; agents can search the catalog and browse products.
- [Away](https://www.awaytravel.com/) - Travel essentials store; agents can search the catalog and read product details.
- [Bestprice](https://www.bestprice.gr/) - Greek price comparison site; agents can search products and open the results.
- [Brooklinen](https://www.brooklinen.com/) - Bedding store; agents can search the catalog and browse products.
- [Dupe.com](https://dupe.com/) - Finds affordable alternatives to designer products; agents can search for dupes.
- [Glossier](https://www.glossier.com/) - Beauty store; agents can search the catalog and browse products.
- [Ippodo Tea](https://ippodotea.com/) - Family-run Kyoto tea company; agents can recommend teas and read brewing guides.
- [Reebok](https://www.reebok.com/) - Athletic shoes and apparel; agents can search the catalog and browse the store.
- [Rothy's](https://rothys.com/) - Shoes and bags store; agents can search the catalog, browse the store and read product details.

## Travel, events and local services

- [Airport Lounge List](https://airportloungelist.com/) - Search 2,600+ airport lounges at 870+ airports; agents can look up lounges by airport and read lounge details.
- [eSIM Data Plans](https://flo-voice1.com/esim) - Data eSIMs for travelers; agents can list plans and buy a plan.
- [Fever](https://feverup.com/) - Discover and book events and experiences; agents can search plans, toggle favorites and list cities.
- [NaCzarter](https://naczarter.pl/en/developers/webmcp) - Charter booking site; agents can search charters, get quotes and read charter details.

## Finance, jobs and business

- [Carejobs](https://carejobs.now/) - Search open nursing, allied health and care jobs; agents can search jobs and check pay.
- [Coinranking](https://coinranking.com/chart/coin/Qwsogvtv82FCd+bitcoin-btc/price) - Cryptocurrency price tracker; agents can drive the Pro Chart through tools.
- [Corpus](https://corpuslaw.us/) - Company formation in all 50 US states; agents can draft a formation application and search state and local requirements.
- [Longbridge](https://longbridge.com/sg) - Stock trading platform for Singapore; agents can read page context and search stocks and news.
- [Settled Estate](https://settledestate.com/webmcp/) - Browser tools to search estate guidance and compare options for online wills.
- [YubHub](https://yubhub.co/) - Live jobs from top employers pulled from careers pages; agents can search and browse jobs.

## Developer platforms and docs

- [Astronomer](https://www.astronomer.io/) - Managed Apache Airflow platform; agents can open the docs, book a demo and navigate the site.
- [Chainstack](https://chainstack.com/) - Blockchain infrastructure provider; agents can fetch site info and search its content.
- [Cloudflare Developer Docs: WebMCP](https://developers.cloudflare.com/browser-run/features/webmcp/) - Cloudflare docs page about WebMCP in Browser Run; agents can search the docs.
- [Customer.io](https://customer.io/) - Customer engagement platform; agents can open product pages and start a free trial.
- [Fly.io](https://fly.io/) - App hosting on hardware-isolated VMs; agents can list resources, open the quickstart and navigate.
- [Glama](https://glama.ai/) - Directory of MCP servers, scanned and scored; agents can search servers.
- [Intlayer](https://intlayer.org/) - Internationalization and content management library; agents can search and list its documentation.
- [MCP-B Docs](https://docs.mcp-b.ai/) - WebMCP documentation with tutorials, polyfills and React packages; agents can read docs info.
- [Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro) - Documentation of the Model Context Protocol; agents can search docs, read pages and navigate.
- [Nodecraft](https://nodecraft.com/) - Game server hosting; agents can list supported games and locations and search its knowledge base.
- [OpenAI Learn](https://learn.chatgpt.com/docs/webmcp) - Documentation site; agents can search OpenAI docs and look up pages and context.
- [Orshot](https://orshot.com/) - Generates images, PDFs and videos from templates; agents can search templates and read details.
- [Pixly](https://pixly.gg/) - Minecraft server hosting billed by the hour; agents can sign in and run console commands.
- [Render](https://render.com/) - Cloud hosting platform; agents can search the docs and fetch pages as Markdown.
- [Sentry](https://sentry.io/welcome/) - Application monitoring for developers; agents can find the right Sentry destination.
- [Telerik UI for Blazor Demos](https://demos.telerik.com/blazor-ui/marketing-campaigns/webmcp-operations-hub) - Blazor component demos where agents drive the examples, such as a warehouse map.
- [Yutori](https://yutori.com/) - Web agent APIs; agents can read the overview and the Navigator model.
- [Zuplo](https://zuplo.com/) - API gateway for APIs, LLMs and MCP; agents can search docs and book a demo.

## Tools and utilities

- [Admin Toolkit](https://admintoolkit.io/) - Browser-based diagnostics for admins: agents can check AI crawler access, validate llms.txt and run DNS lookups.
- [Archipelago](https://warrenperez.com/en/archipelago/) - Maps a Notion workspace for free; agents can read service details and output.
- [Cloud and DevSecOps Tools](https://www.alekseialeinikov.com/en/tools) - Free cloud and security tools: agents can check a GCP IAM policy, pick compute or a database, explain or convert cron expressions, analyze a JWT and search the blog.
- [Cocktail](https://cocktail.glass/) - Browse 500 cocktail recipes by ingredient, glass or category; agents can search and fetch recipes.
- [Image to SVG Converter](https://botmonster.com/image2svg/) - Converts PNG, JPEG and WebP images to SVG in the browser; agents can query site capabilities and blog posts.
- [JSON-stat WebMCP Explorer](https://jsonstat.com/webmcp/?url=https%3A%2F%2Fjson-stat.org%2Fsamples%2Fcollection.json) - Explore JSON-stat endpoints; agents can fetch datasets, inspect metadata and change the view.
- [Kakeklar](https://kakeklar.no/?gjester=12&alder=6) - Free children's birthday calculator; agents can plan a party and get a shopping list.
- [QR Code Crafter](https://qrcodecrafter.com/) - Free static QR codes without an account; agents can generate verified and bulk QR codes.
- [Scholar Sidekick](https://scholar-sidekick.com/integrations/webmcp) - Seven citation tools: agents can verify citations and audit bibliographies.
- [Simple Tool Stack](https://simpletoolstack.com/) - Free in-browser image and text tools; agents can discover the available tools.
- [SimplePDF](https://ai.simplepdf.com/editor) - Fill out and sign PDFs in the browser; agents can set field values and drive the embedded editor.
- [SpeedOf.Me](https://speedof.me/m/) - Internet speed test; agents can run a test and create a share link.
- [Stacktr](https://stacktr.ee/) - Sends reports, audits and proposals as private pages; agents can publish HTML.
- [Timeline Studio](https://video-editor.ai-creator.top/) - Timeline-based video editor with AI voiceovers and captions; agents can inspect and edit tracks.
- [Toban](https://toban.app/) - Free duty-roster app in Japanese; agents can list schedules and current assignments.
- [WebConverter](https://webconverter.app/webmcp.html) - File converter run as a WebMCP server: agents can convert images and combine them into PDFs.

## Agent readiness and WebMCP tooling

- [Agent Ready](https://agent-ready.dev/) - Scores a website against the Vercel Agent Readability Spec and the llmstxt.org standard; agents can scan a site and fetch the report.
- [Discovered Labs](https://discoveredlabs.com/blog/prepare-your-website-for-webmcp-a-step-by-step-implementation-checklist) - Checklist for preparing a website for WebMCP; agents can calculate evaluation sample sizes and book an intro call.
- [FAF WebMCP Playground](https://faf.one/webmcp) - Score a project.faf file, generate AGENTS.md and fill the context card in the browser.
- [Is AI Native](https://isainative.dev/) - Scans public GitHub repositories for prompts, instructions, agents, skills, hooks and MCP use.
- [Known Good WebMCP Checker](https://knowngood.sh/verify/webmcp) - Checks whether a website declares WebMCP tools and whether any tool registers when the page loads.
- [Latch](https://latch.tools/) - Turns a site's buttons, search and forms into actions for AI agents with one line of code.
- [LightSite](https://www.lightsite.ai/blog/what-is-google-webmcp-and-what-it-means-for-marketers) - Explains Google WebMCP and exposes business facts and product search to agents.
- [SCVD General Store](https://scvd.store/) - Evidence observatory for agentic commerce; agents can check A2A cards and purchase endpoints.
- [Signett](https://www.signett.ai/) - Agent-interface tooling for exposing and verifying product capabilities.
- [Site Passport](https://sitepassport.org/) - Free check of whether a website is ready for AI agents.
- [Turva](https://turva.dev/) - Agent-readiness audits for websites and APIs, plus Shopify checks.
- [UCP Playground](https://ucp.new/) - Explore the Universal Commerce Protocol with live Shopify catalog search.
- [WebMCP Checker](https://webmcp-checker.com/) - Audit whether a site is ready for AI agents and inspect its WebMCP info.
- [WebMCP Directory](https://webmcp.com/) - Explore agent-ready websites and Shopify stores; agents can search the directory and get a site's tools.
- [WebMCP Registry](https://webmcp-registry.dev/) - Public index for WebMCP tool contracts; agents can search tools and domains.
- [WebMCP Today](https://webmcp.today/) - Public beta registry of inspectable WebMCP packages.
- [WordLift AI Audit](https://audit.wordlift.io/) - AI visibility audit for websites; agents can start an audit with a single run-audit tool.

## Publications and personal sites

- [Cloudflare Blog: Browser Run](https://blog.cloudflare.com/browser-run-for-ai-agents/) - Cloudflare blog post about Browser Run that exposes a search tool to agents.
- [Cloverbase](https://cloverbase.com/) - Independent AI counsel for New Zealand boards; agents can read site info and search posts.
- [Halmob](https://halmob.com/contact) - Studio website; agents can list and read blog posts and navigate the site.
- [Implementing WebMCP](https://ricmac.org/2026/03/11/webmcp-ai-agents-interact-website/) - Article about implementing WebMCP; agents can find text in it and subscribe to the newsletter.
- [Madrona](https://www.madrona.com/) - Venture capital firm website; agents can read company, insight and team pages.
- [nz365guy](https://nz365guy.com/) - Blog of a Microsoft AI MVP; agents can read site info and list and search posts.
- [StudioMeyer: WebMCP Reality Check](https://studiomeyer.io/en/blog/webmcp-reality-check-may-2026) - Analysis of the real-world status of WebMCP; agents can browse the portfolio.
- [Suganthan Mohanadasan](https://suganthan.com/) - Blog of an AI SEO consultant; agents can search and read posts.
- [TweakTown](https://www.tweaktown.com/) - Technology news and reviews; agents can search articles and look up pages.
- [Viet-Anh Nguyen](https://www.vietanh.dev/) - Personal site on building and evaluating AI systems; agents can search and read posts.

## Demos and playgrounds

- [1 Million Emojis](https://chriswijnia.com/lab/emoji) - Shared 1,000 by 1,000 emoji canvas where humans and agents paint together.
- [AI Agent Text Editor](https://bandarra.me/apps/webmcp-text-editor/) - Text editor where agents read the editor state and use skills to edit documents.
- [Cadence](https://cadence-webmcp.ashrafahmed1232.workers.dev/) - Agent-native issue tracker built on WebMCP; agents can list, search and read issues.
- [Cesium Agent Lab](https://cesium-browser-agent.pages.dev/) - 3D globe sandbox where agents control the camera and the view through dozens of tools.
- [Codex Modeling Studio](https://codex-modeling-studio.openai.chatgpt.site/) - Browser workspace where agents author 3D scenes through tools.
- [Consequence](https://consequence-webmcp.ashrafahmed1232.workers.dev/) - Fictional high-stakes application where every field has a permission class, built on WebMCP.
- [Cubecade](https://cubecade.openai.chatgpt.site/) - Neon 3D color-cube puzzle that humans and agents solve together.
- [Fieldwork Beat Machine](https://fieldwork-beat-machine.openai.chatgpt.site/) - Twelve-voice drum machine and synth where agents load and edit projects.
- [Flight Booking Demo](https://webmcp-flight-demo.netlify.app/) - Flight search demo with a search_flights tool.
- [Kanban Board](https://webmcp-kanban-demo.vercel.app/) - Kanban demo where agents read the board and create cards.
- [Kurio](https://webmcp-kurio.netlify.app/) - WebMCP-enabled demo marketplace with product search.
- [Lumen Labs](https://www.persona-chat.dev/webmcp-slides.html) - Presentation demo where agents read the deck overview and slides.
- [Mabel's Table](https://webmcp-mabels-table.netlify.app/) - Fictional bistro where agents check availability and hold a table.
- [Margin](https://margin-local-docs.openai.chatgpt.site/) - Private, local-first documentation editor where people and agents collaborate.
- [Open for Agents Demo](https://demo.openforagents.com/) - Declarative browser-agent actions demo; agents can read site info, post types and navigation.
- [Paperie](https://paperie-webmcp-greeting-cards.openai.chatgpt.site/) - Greeting-card studio where agents set the recipient and the message.
- [Parity](https://parity-webmcp.vercel.app/) - Booking demo for specialist care where the UI, a command palette and an agent share one state.
- [Relay](https://relay-webmcp.ashrafahmed1232.workers.dev/) - Operations console built on WebMCP where every UI action has a matching tool.
- [Respira Demo Studio](https://chatgpt-respira.instawp.site/) - WordPress demo where agents work with the site context through Respira tools.
- [Sema Playground](https://sema.run/) - Browser playground where agents read and write the editor.
- [simple-webmcp](https://emingure.github.io/simple-webmcp/demo/) - Small shop demo where agents search products and manage a cart.
- [Sunday Table](https://sundaytable.openai.chatgpt.site/) - Weekly meal planner where agents manage meal slots, recipes and groceries.
- [Tagboard](https://webmcp-tagboard.netlify.app/) - Colorful demo where agents read and write tagged notes.
- [The Archive](https://webmcp-archive.netlify.app/) - Investigation game where agents search archive records.
- [The Crossword Desk](https://crossword-desk-studio.openai.chatgpt.site/) - Crossword designer where agents set the puzzle title and add word candidates.
- [Turnfeed](https://turnfeed.theodornengoy.chatgpt.site/) - Social feed with ChatGPT sign-in, hosted on ChatGPT Sites.
- [Verdant Market](https://verdant-market-grocery.openai.chatgpt.site/#home) - Neighborhood grocery demo where agents list departments and search products.
- [WanderNote](https://wandernote.openai.chatgpt.site/) - Travel planner where agents read and set trip details.
- [WebMCP Blackjack](https://webmcp-blackjack.heejae.dev/) - Blackjack game where agents read the state and wait for phases.
- [WebMCP Challenge](https://webmcp-challenge.examples.workers.dev/) - Build and test WebMCP apps on Cloudflare for the OpenAI WebMCP Hackathon.
- [WebMCP Excalidraw Demo](https://shidh.in/demo/webmcp-excalidraw/) - Agents generate and validate Mermaid diagrams for Excalidraw.
- [WebMCP Flow](https://webmcp-flow.vercel.app/) - Flow diagram editor where agents add nodes and edges.
- [WebMCP Playground](https://webmcp.sh/) - Playground built on PGlite where agents navigate and read context.
- [WebMCP Starter](https://webmcp-starter.netlify.app/) - Prompt-first Netlify template for adding WebMCP tools to a site.
- [WebMCP Store Demo](https://andreinwald.github.io/webmcp-demo/) - Demo shop where agents list store items, add them to the cart and show the cart.
- [WebMCP Travel](https://travel-demo.bandarra.me/) - Flight search demo with a searchFlights tool.
- [WebMCP zaMaker](https://googlechromelabs.github.io/webmcp-tools/demos/pizza-maker/) - Chrome Labs pizza builder where agents set size, style and toppings.
- [Webroom](https://webroom.openai.chatgpt.site/) - Private browser photo editor with manual controls that agents can drive.
- [WordPress Playground](https://playground.wordpress.net/) - WordPress running in the browser; agents can execute PHP and send requests.
- [WSG WebMCP Experiment](https://mgifford.github.io/wsg-webmcp-experiment/) - Web Sustainability Guidelines experiment; agents can search guidelines and success criteria.

## FAQ

### How sites are verified

A browser opens the page with a small shim for `document.modelContext` installed before any script runs. Every tool the page registers is recorded, and a site is listed only when at least one tool or `toolname` form is found. The same check repeats weekly.

### Why a site is not detected

The check sees tools that register when the page loads. Tools created after a click, behind a login, on a deeper page or only in a browser with a special flag are missed. Register at least one tool on the page you submit, for example site search.

### Which browsers support WebMCP

Support is rolling out in Chromium-based browsers as an experiment, and the standard is still a proposal. The specification repository linked at the top has the current status.

### How to add a site

Open a pull request that adds one line to the right section. The contributing guide has the format and the rules.

## Contributing

Contributions are welcome. Read the [contribution guidelines](CONTRIBUTING.md) first.
