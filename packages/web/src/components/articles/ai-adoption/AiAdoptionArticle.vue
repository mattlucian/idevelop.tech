<script setup lang="ts">
import ArticleCite from "../../article/ArticleCite.vue";
import ArticleExamples from "../../article/ArticleExamples.vue";
import ArticleTradeoffs from "../../article/ArticleTradeoffs.vue";
import AiUseGapChart from "./AiUseGapChart.vue";
import AiIntegrationLevelsChart from "./AiIntegrationLevelsChart.vue";
import FourRolesDiagram from "./FourRolesDiagram.vue";
import CentralizedKnowledgeDiagram from "./CentralizedKnowledgeDiagram.vue";
import AiRunsProcessDiagram from "./AiRunsProcessDiagram.vue";
import AiBuildsProcessDiagram from "./AiBuildsProcessDiagram.vue";
import OperatorPathDiagram from "./OperatorPathDiagram.vue";
import {
  assistantExamples,
  builderExamples,
  teammateExamples,
  operatorExamples,
} from "@/data/articles/ai-adoption-examples";
import {
  assistantTradeoffs,
  builderTradeoffs,
  teammateTradeoffs,
  operatorTradeoffs,
} from "@/data/articles/ai-adoption-tradeoffs";
</script>

<template>
  <div
    class="prose prose-invert prose-slate max-w-none md:prose-lg prose-headings:font-bold prose-h2:mt-16 prose-h3:mt-10 prose-a:text-cyan-400 prose-strong:text-white"
  >
    <p>
      Two-thirds of US small businesses now claim they use AI, nearly three
      times the share in 2023.<ArticleCite :n="1" /> However, far fewer
      businesses seem to actually be using it in their day-to-day operations.
      When small businesses were asked whether they had used AI in any business
      function in the past two weeks, only about 22% to 36% said yes, depending
      on their size.<ArticleCite :n="2" />
    </p>

    <AiUseGapChart />

    <p>
      In addition, most small businesses have been using AI in a limited
      capacity. In 2025, the most common uses of AI related to writing content
      (83%) and personal productivity (61%), while only 21% used AI to automate
      a process. About half of businesses were still experimenting with AI, and
      only 7% had fully integrated it into their company operations.<ArticleCite
        :n="3"
      />
    </p>

    <AiIntegrationLevelsChart />

    <p>
      Research suggests the businesses seeing the largest financial gains from
      AI are far more likely to have redesigned core workflows around
      it.<ArticleCite :n="4" />
      With about half of small businesses that use AI still experimenting, many
      may not have seen those gains yet.
    </p>
    <p>
      For a small business, this can be a daunting and unclear step. What does
      "redesigning a workflow around AI" really mean? And how does a small
      business with limited resources actually work towards this milestone?
    </p>
    <p>
      In a small business training program, many participants cited the "<em
        >barriers to deeper integration</em
      >" related to "<em>lack of technical expertise</em>", difficulty "<em
        >choosing tools</em
      >", and "<em>data privacy concerns</em>". Nearly 75% of participants in
      this program said they would benefit from more training and help putting
      AI in place.<ArticleCite :n="5" />
    </p>
    <p>
      I've observed this same sentiment while working with small businesses over
      the years. As a result, I've written this article to demonstrate an
      iterative path a small business can reference, using practical examples.
    </p>

    <h2>Four Roles for AI</h2>
    <p>
      While every organization's use of AI may differ slightly, for the sake of
      discussion, we'll classify AI usage into the following four roles:
    </p>
    <ol>
      <li>
        <strong>Assistant</strong>: Using AI individually to help out with your
        tasks
      </li>
      <li>
        <strong>Builder</strong>: Using AI to build tools that systematically
        improve operations
      </li>
      <li>
        <strong>Teammate</strong>: Using AI to interpret information within a
        process for people to act on
      </li>
      <li>
        <strong>Operator</strong>: Using AI to make decisions without a person
        needing to intervene
      </li>
    </ol>
    <p>
      It's important to note that these roles should be assessed at a
      task-level. For example, some critical tasks may never be suitable for the
      Operator role due to risk factors or non-determinism, but they might still
      benefit from one of the other roles.
    </p>

    <FourRolesDiagram />

    <p>This breakdown will help us navigate a few different ideas:</p>
    <ul>
      <li>
        To use AI within the workplace you do not need to blindly trust its
        output
      </li>
      <li>
        You can use AI in a way that mitigates risk and data privacy concerns
      </li>
      <li>
        Different tasks within organizations may be suitable for different roles
        of AI
      </li>
      <li>
        There is a natural progression path for maturing AI adoption within an
        organization
      </li>
    </ul>
    <p>
      To start, let's discuss the most basic way to use AI: using it as an
      assistant for individual tasks.
    </p>

    <h2>AI as an Assistant</h2>
    <p>
      Most small businesses that use AI use it in this capacity. To put it
      simply: A person asks AI for a draft or an answer and decides what to do
      with the result.
    </p>

    <ArticleTradeoffs v-bind="assistantTradeoffs" />

    <p>
      While AI can speed up drafting and research, inaccurate output that gets
      past a reviewer can be costly. In 2025, Deloitte agreed to refund part of
      its fee for an Australian government report that cited research that
      didn't exist. Deloitte had disclosed using generative AI to help produce
      the report.<ArticleCite :n="8" />
    </p>

    <h3>Centralized Knowledge</h3>
    <p>
      This is where the concept of "Centralized Knowledge" comes into the
      picture: a shared place for the information that both people and AI
      assistants work from. It generally holds two kinds of information:
    </p>
    <ul>
      <li>
        <strong>Reference material</strong>: Facts about the business, such as
        policies, product details, and process documentation.
      </li>
      <li>
        <strong>Instructions</strong>: Guidance for a specific task that tells
        AI how to interpret a request and what the result should look like, such
        as the format, the tone, or which documents to use.
      </li>
    </ul>
    <p>Having a centralized repository of information can help by:</p>
    <ul>
      <li>
        Enabling specific knowledge-holders to maintain info pertaining to their
        expertise
      </li>
      <li>
        Serving as a source of truth for specific organization information
      </li>
      <li>
        Allowing for iterative improvement of the AI assistants because
        inaccuracies can be corrected within a shared space
      </li>
    </ul>

    <CentralizedKnowledgeDiagram />

    <p>
      Most importantly, what one employee learns becomes available to everyone,
      from new hires to experienced staff.
    </p>
    <p>
      A related study measured the effect of using AI to spread top performers'
      knowledge. Among more than 5,000 customer support staff, an AI assistant
      trained on past support conversations, with extra weight on top
      performers' chats, raised productivity by 15% on average and by about 30%
      for less experienced staff.<ArticleCite :n="9" />
    </p>
    <p>
      Whatever tool a business uses, centralized knowledge needs five things:
    </p>
    <ul>
      <li>
        <strong>A shared home</strong>: Everyone works from the same reference
        material and instructions, kept in a team ChatGPT or Claude project or
        in a common folder.
      </li>
      <li>
        <strong>Clear ownership</strong>: The people who know each subject best
        maintain its material, and everyone else uses it.
      </li>
      <li>
        <strong>Version history</strong>: A record of changes means a bad edit
        can be traced and corrected.
      </li>
      <li>
        <strong>Answer rules</strong>: The instructions tell the AI to answer
        only from the business's own documents and to flag anything it is unsure
        about.
      </li>
      <li>
        <strong>Business accounts</strong>: Employees use company accounts, so
        business information stays out of personal ones.
      </li>
    </ul>
    <p>
      Centralized knowledge also gives employees an approved way to use AI. In a
      global study, 57% of employees said they hide their use of AI at work and
      present AI-generated work as their own.<ArticleCite :n="10" /> When a
      business provides the tools and reference material, employees may have
      less reason to hide their AI use.
    </p>

    <h3>Eligible Assistant Tasks</h3>
    <p>A task may be eligible for an AI assistant when:</p>
    <ul>
      <li>
        A person starts each request, rather than a process triggering it.
      </li>
      <li>
        That person reviews AI's draft or answer and decides what to do with it.
      </li>
    </ul>

    <ArticleExamples title="AI as an assistant" :examples="assistantExamples" />

    <p>
      Refined over time, this knowledge becomes useful beyond the assistant
      role. A well-documented process can serve as the requirements for an
      automated process, and AI can use that documentation to build the
      automation, which leads us to discussing the builder role.
    </p>

    <h2>AI as a Builder</h2>
    <p>
      As a builder, AI helps create tools for deterministic workflows that might
      otherwise take too much time or technical skill for a small organization.
      Once built, these tools often don't need to call an AI model to run, so a
      business can benefit from AI without depending on it day to day.
    </p>

    <ArticleTradeoffs v-bind="builderTradeoffs" />

    <p>
      To see where these benefits come from, it helps to compare this approach
      with the way many people first picture automating a process with AI: AI
      handling each order or request as it comes in. That approach raises a few
      concerns I often hear about incorporating AI into operations:
    </p>

    <AiRunsProcessDiagram />

    <p>
      However, there's a more predictable way to use AI in this process. Instead
      of reacting to each order and making decisions, AI can be used to discuss,
      plan, and build a standard automation that runs on well-defined rules and
      alerts staff when something falls outside of those rules:
    </p>

    <AiBuildsProcessDiagram />

    <h3>Testing Before Launch</h3>
    <p>
      Because an automation behaves the same way every time, a business can test
      exactly what will run before the automation goes live. AI can also help
      write the documentation, so the business depends less on technical
      resources for upkeep or questions.
    </p>
    <p>
      Before launch, AI can help find a process's exceptions by asking about
      situations the written rules don't cover yet.
    </p>
    <p>
      As new scenarios are uncovered, staff can use AI to refine the automated
      process's rules to better handle these situations. Using AI as a builder
      in this way creates an iterative path for AI to improve operations with
      fewer of the risks of inconsistent answers, unpredictable costs, or data
      privacy concerns.
    </p>

    <h3>Eligible Builder Tasks</h3>
    <p>A process may be eligible for an AI-built automation when:</p>
    <ul>
      <li>
        Its steps can be defined as rules that apply the same way every time.
      </li>
      <li>Its inputs are structured data rather than free-form text.</li>
    </ul>

    <ArticleExamples title="AI as a builder" :examples="builderExamples" />

    <p>
      However, there are limits to this approach. Although AI-built automations
      can prove reliable, they only work for deterministic workflows where
      someone has defined the rules in advance. Many other business tasks may be
      ineligible for this approach because they require interpretation or are
      based around unstructured data. For these tasks, you may need to evolve
      your usage of AI and incorporate it more like a teammate.
    </p>

    <h2>AI as a Teammate</h2>
    <p>
      As a teammate, AI handles a step that requires interpretation each time a
      process runs. The AI's output helps the people working on a task, and they
      can use it, adjust it, or set it aside. The output should generally be
      internal, such as context added to an internal work item or a drafted
      reply (needing review) to a customer inquiry.
    </p>

    <ArticleTradeoffs v-bind="teammateTradeoffs" />

    <p>
      Used this way, AI can support staff by gathering context and recommending
      actions for each item. However, because AI runs every time the process
      does, its challenges need to be managed with care.
    </p>

    <h3>Keeping People in Control</h3>
    <p>
      The following practices serve as quality-control levers organizations can
      use to limit these challenges:
    </p>
    <ul>
      <li>
        <strong>Strip sensitive data</strong>: Before the AI gets the data to
        interpret, sensitive information is stripped to ensure data privacy or
        compliance requirements
      </li>
      <li>
        <strong>Interpretation and drafts</strong>: AI interprets, matches,
        summarizes, or drafts, and people decide what to do with the result.
      </li>
      <li>
        <strong>Limited access</strong>: AI can read what it needs and add notes
        or drafts, but it can't send messages, close tickets, or edit records.
      </li>
      <li>
        <strong>Approval for customer-facing output</strong>: A person approves
        anything that reaches a customer or changes a record before it takes
        effect. Internal context, such as ticket notes, can be corrected after
        the fact.
      </li>
      <li>
        <strong>One run per item</strong>: Running AI once per ticket or order
        keeps token costs in line with the volume of work. Clear limits in the
        instructions, such as which sources to check and how long the output
        should be, also keep AI's work predictable and its token use in check.
      </li>
      <li>
        <strong>Tracked corrections</strong>: The corrections people make to the
        AI's output show where AI's instructions need refinement.
      </li>
    </ul>

    <h3>Eligible Teammate Tasks</h3>
    <p>In my experience, a task may be eligible for an AI teammate when:</p>
    <ul>
      <li>It is a recurring step within a process.</li>
      <li>
        Its inputs require interpretation that fixed rules can't perform
        reliably.
      </li>
      <li>A person handles each item and acts on AI's result.</li>
    </ul>

    <ArticleExamples title="AI as a teammate" :examples="teammateExamples" />

    <p>
      In the teammate role, people still carry out every action. That keeps risk
      low, but for high-volume tasks, waiting on people can become a bottleneck.
      Once a process is stable and AI's output no longer needs frequent
      refinement, the business can let AI take the action itself. In that sense,
      an operator is a more mature teammate. It builds on the teammate role, but
      letting AI act raises the stakes, so it comes once AI has proven to be
      reliable.
    </p>

    <h2>AI as an Operator</h2>
    <p>
      As an operator, AI makes decisions and acts on them without a person
      approving each decision. AI in this role is often called an agent. The
      agent acts on at least some routine decisions itself, and people review
      the cases it can't resolve within its limits.
    </p>

    <ArticleTradeoffs v-bind="operatorTradeoffs" />

    <p>
      Letting AI decide routine cases can remove the wait for approvals, but
      this is also the hardest role to get right. Few companies, even large
      ones, have given AI this much responsibility. At US companies with 1,000
      or more employees, two-thirds of departments use AI agents, but only 17%
      of departments let an agent complete a task without a person approving
      each step.<ArticleCite :n="12" />
    </p>

    <h3>Approved Actions and Escalation</h3>
    <p>
      When an agent acts without approvals, these safeguards keep its decisions
      within bounds:
    </p>
    <ul>
      <li>
        <strong>Small, reversible decisions first</strong>: Flagging, routing,
        or holding an order is safer than issuing a refund or canceling the
        order.
      </li>
      <li>
        <strong>Action limits</strong>: Define which actions are allowed and set
        caps, such as a maximum order value, so anything beyond them goes to a
        person.
      </li>
      <li>
        <strong>Written rules</strong>: The agent follows documented rules that
        build on the centralized knowledge from the assistant role.
      </li>
      <li>
        <strong>Escalation</strong>: When a case doesn't fit the rules, the
        agent hands it to a person.
      </li>
      <li>
        <strong>Logging</strong>: The agent records every action, and someone
        regularly reviews a sample of routine decisions along with every
        escalated case.
      </li>
      <li>
        <strong>An off switch</strong>: Staff can pause the agent and return to
        the manual process.
      </li>
    </ul>
    <p>
      These safeguards are a starting point rather than a full implementation
      plan. Putting an agent into production involves more technical detail,
      which is where a technical employee or contractor can help.
    </p>
    <p>
      In my experience, businesses do best with AI as an operator when they
      treat an agent the way they would treat a new employee, by gradually
      increasing its responsibility as it proves itself. The teammate role works
      like a trial period for this: while people still make each decision, they
      can see how often AI's recommendations need correcting. Once corrections
      are rare, and spot checks confirm reviewers are still catching mistakes,
      the agent can take on the cases that are easiest to reverse. From there,
      its scope of responsibility can grow as it proves successful.
    </p>

    <OperatorPathDiagram />

    <p>
      As the agent takes on more work, it's also a good practice to have a
      "manager" for AI operators who periodically reviews its output for
      feedback and improvement opportunities.
    </p>

    <h3>Customer-Facing Decisions</h3>
    <p>
      When an agent's decisions reach customers directly, a mistake is harder to
      contain and can affect how customers see the business. A support chatbot
      is a common example, because each answer it gives is a decision about what
      to tell a customer.
    </p>
    <p>
      Customer-facing agents carry two risks. The first is legal liability.
      Tribunals and courts have started holding businesses responsible for what
      their chatbots tell customers. In 2024, a Canadian tribunal ruled against
      an airline on this point.<ArticleCite :n="13" />
    </p>
    <blockquote>
      <p>
        Jake Moffatt asked Air Canada's chatbot about bereavement fares after
        his grandmother died. The chatbot told him he could request the
        bereavement discount after his flight, but the airline's actual policy
        said otherwise. When Air Canada refused the discount, the airline argued
        that the chatbot was responsible for its own actions. The tribunal
        disagreed:
      </p>
      <p>
        <strong
          >"It should be obvious to Air Canada that it is responsible for all
          the information on its website."</strong
        >
      </p>
      <p>Moffatt v. Air Canada, 2024 BCCRT 149</p>
    </blockquote>
    <p>
      In May 2026, a German higher regional court reached a similar conclusion
      about a company's website chatbot.<ArticleCite :n="14" />
    </p>
    <p>
      The second risk is service quality. Klarna said in 2024 that its AI
      assistant was doing the work of 700 full-time customer service
      staff.<ArticleCite :n="15" /> A year later, Klarna's CEO said cost savings
      had played too large a role in the company's move to AI customer service,
      and that service quality had suffered as a result. He described investing
      in human support as the way forward.<ArticleCite :n="16" />
    </p>
    <p>
      Both risks shrink when the chatbot answers only from approved content,
      hands uncertain questions to a person, and makes a person easy to reach.
    </p>

    <h3>Eligible Operator Tasks</h3>
    <p>A task may be eligible for an AI operator when:</p>
    <ul>
      <li>Its results have proven reliable, and people rarely correct them.</li>
      <li>Its decisions can stay within defined rules and limits.</li>
      <li>Cases outside those limits can be handed to a person.</li>
    </ul>

    <ArticleExamples title="AI as an operator" :examples="operatorExamples" />

    <h2>Closing Thoughts</h2>
    <p>
      After years of wide availability, it seems that few small businesses have
      successfully integrated AI into their operations,<ArticleCite :n="3" />
      even though the businesses seeing the largest financial gains are far more
      likely to have built AI into their core operations.<ArticleCite :n="4" />
    </p>
    <p>
      This appears to follow an existing trend where the most intricate
      technological evolutions are first adopted by larger companies that have
      more budget, staff, and in-house expertise to dedicate to them.
    </p>
    <p>
      However, AI has the potential to be different. It can ease some of those
      limitations by filling in missing technical knowledge and iteratively
      solving problems at a reasonable cost. In my experience, one technical
      person working with AI can now build tools that once needed a larger team.
      This may make AI one of the more useful technologies small businesses have
      had access to in a long time.
    </p>
    <p>
      The bottleneck has moved as a result. For most small businesses, the
      bottleneck is now the time it takes to define their workflows and
      willingness to evolve their operations. A business that writes down their
      operational workflows can now automate or improve them quickly with AI's
      help. That one-time effort can then save staff time every week.
    </p>
    <p>
      In addition, documentation used to be de-prioritized and viewed as a
      tedious administrative step, whereas now it might just be the first
      tangible step you can take to improve your business:
    </p>
    <ol>
      <li>
        If you aren't using AI yet, start with it as an
        <strong>Assistant</strong>, and use it to document and refine your
        workflows along the way.
      </li>
      <li>
        Use that documentation to automate time-consuming tasks with AI as a
        <strong>Builder</strong>.
      </li>
      <li>
        Add AI as a <strong>Teammate</strong> to streamline tasks that need
        interpretation, with recommendations that follow your procedures.
      </li>
      <li>
        Once those recommendations prove reliable, use AI as an
        <strong>Operator</strong> to automate tasks that fixed rules can't.
      </li>
    </ol>
    <p>
      Unlike many technologies, AI offers an incremental path where each step
      can add value on its own. Whether you aren't using AI yet or already use
      it regularly, I hope this article shows how you can gradually incorporate
      it into your business operations as the technology keeps advancing.
    </p>
  </div>
</template>
