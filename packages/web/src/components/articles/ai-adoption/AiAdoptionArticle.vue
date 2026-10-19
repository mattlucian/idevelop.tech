<script setup lang="ts">
import ArticleCite from "../../article/ArticleCite.vue";
import ArticleFigure from "../../article/ArticleFigure.vue";
import ArticleFlow from "../../article/ArticleFlow.vue";
import ArticleExamples from "../../article/ArticleExamples.vue";
import AiUseTrendChart from "./AiUseTrendChart.vue";
import AiIntegrationLevelsChart from "./AiIntegrationLevelsChart.vue";
import FourRolesDiagram from "./FourRolesDiagram.vue";
import TwoWaysDiagram from "./TwoWaysDiagram.vue";
import TeammateScopeDiagram from "./TeammateScopeDiagram.vue";
import {
  assistantExamples,
  builderExamples,
  teammateExamples,
  operatorExamples,
} from "@/data/articles/ai-adoption-examples";
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
      function in the past two weeks, fewer than 25% said yes.<ArticleCite
        :n="2"
      />
    </p>

    <AiUseTrendChart />

    <p>
      In addition, most small businesses have been using AI in a limited (and
      oftentimes ineffective) capacity. Last year the most common uses of AI
      related to writing content (83%) and personal productivity (61%), while
      only 21% used AI to automate a process. About half of businesses were
      still experimenting with AI, and only 7% had fully integrated it into
      their company operations.<ArticleCite :n="3" />
    </p>

    <AiIntegrationLevelsChart />

    <p>
      Research suggests the businesses seeing the largest financial gains from
      AI are far more likely to have redesigned core workflows around
      it.<ArticleCite :n="4" />
      With about half of small businesses still experimenting, many may not have
      seen those gains yet.
    </p>
    <p>
      This can be a daunting and unclear evolution for small businesses though
      because what does "redesigning a workflow around AI" really mean? And how
      does a small business with limited resources actually work towards this
      milestone?
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
      the years. As such, I've decided to write up this article to demonstrate
      an iterative path a small business can adopt using practical examples.
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
    <p>
      This can seem very helpful because AI can summarize information and output
      these drafts or answers very quickly. However, there are some challenges
      when leveraging AI in this capacity.
    </p>
    <ul>
      <li>
        AI may output inaccurate information for a variety of reasons
        <ul>
          <li>Trained on outdated information</li>
          <li>Over-simplifying a nuanced topic</li>
          <li>Hallucinating<ArticleCite :n="6" /></li>
        </ul>
      </li>
      <li>
        The individual using AI becomes a "reviewer" and must verify claims
        <ul>
          <li>
            May not have the subject matter expertise or attention to detail to
            properly assess the AI's output for accuracy
          </li>
          <li>
            May begin to experience "automation complacency" over time, reducing
            quality<ArticleCite :n="7" />
          </li>
          <li>
            As corrections are made, they need to be shared organization-wide or
            other team members may experience the same incorrect result in the
            future
          </li>
        </ul>
      </li>
    </ul>
    <p>
      These challenges played out publicly in 2025, when Deloitte agreed to
      refund part of its fee for an Australian government report that cited
      research that didn't exist. Deloitte had disclosed using generative AI to
      help produce the report.<ArticleCite :n="8" />
    </p>

    <h3>Shared Instructions</h3>
    <p>
      This is where the concept of "Shared Instructions" or a centralized
      knowledge base that AI assistants can reference comes into the picture.
    </p>
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

    <ArticleFigure title="Each refinement improves the next draft" ai-legend>
      <ArticleFlow
        :steps="[
          { text: 'Person asks, using shared instructions' },
          { text: 'AI drafts the document', ai: true },
          { text: 'Person refines the draft' },
          { text: 'Refinements go into shared instructions' },
        ]"
        loop="Each new request starts from the updated instructions"
      />
    </ArticleFigure>

    <p>
      Most importantly, these shared resources enable both new and experienced
      employees to benefit from this shared knowledge.
    </p>
    <p>
      A related study measured the effect of using AI to spread top performers'
      knowledge. Among more than 5,000 customer support agents, an AI assistant
      trained on top performers' conversations raised productivity by 15% on
      average and by about 30% for less experienced and lower-skilled
      agents.<ArticleCite :n="9" />
    </p>
    <p>Whatever tool a business uses, shared instructions need five things:</p>
    <ul>
      <li>
        <strong>A shared home</strong>: Everyone works from the same
        instructions, kept in a team ChatGPT or Claude project or in a common
        folder.
      </li>
      <li>
        <strong>Clear ownership</strong>: The people who know each subject best
        maintain the instructions, and everyone else uses them.
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
      Shared instructions also give employees an approved way to use AI. In a
      global study, 57% of employees said they hide their use of AI at work and
      present AI-generated work as their own.<ArticleCite :n="10" /> When a
      business provides the tools and reference material, employees have less
      reason to hide their AI use.
    </p>

    <ArticleExamples title="AI as an assistant" :examples="assistantExamples" />

    <p>
      Refined over time, the instructions become useful beyond the assistant
      role. A store's written rules for special orders or supplier preferences,
      for example, can serve as the requirements to build out an automated
      process. AI can use these refined instructions to build out these
      automations, which leads us to discussing the builder role.
    </p>

    <h2>AI as a Builder</h2>
    <p>
      As a builder, AI helps create tools for deterministic workflows that might
      otherwise take too much time or technical skill for a small organization.
      Once built, these tools often don't need to call an AI model to run, so a
      business can benefit from AI without depending on it day to day.
    </p>
    <p>
      Building tools this way avoids a few concerns I hear most often about
      putting AI into operations:
    </p>
    <ul>
      <li>
        <strong>Inconsistency</strong>: The same request to an AI model can
        produce a different answer each time. Catching those differences
        requires a review step or a very detailed set of rules.
      </li>
      <li>
        <strong>Cost</strong>: AI is often billed per token, and token use can
        be hard to predict once a process runs at volume. In my experience,
        unexpected usage costs are one of the most common surprises for
        businesses running AI in their processes.
      </li>
      <li>
        <strong>Data Privacy</strong>: You can have AI help build automations
        using test data so that sensitive data is never exposed to the AI
        models. This allows you to run these automations within your private
        networks for privacy or compliance purposes.
      </li>
    </ul>

    <TwoWaysDiagram />

    <p>
      Because an automation behaves the same way every time, a business can test
      exactly what will run before the automation goes live. AI can also help
      write the documentation, so the business depends less on technical
      resources for upkeep or questions.
    </p>
    <p>
      Building an automation also brings a process's exceptions to light. Cases
      that staff used to handle from memory, or that went unhandled, have to be
      spelled out before the automation can follow them. AI can help find these
      cases by asking about situations the written rules don't cover yet.
    </p>
    <p>
      As new scenarios are uncovered, staff can use AI to refine the automated
      process's rules to better handle these situations. Using AI as a builder
      in this way creates an iterative path for AI to improve operations without
      incurring risks of inconsistent answers, unpredictable costs, or data
      privacy concerns.
    </p>

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
    <p>
      Whether that output needs approval depends on where it goes. Context added
      to an internal ticket can simply be corrected if it turns out to be wrong.
      Likewise, a reply drafted for a customer can be reviewed, approved, or
      adjusted by a person before it's sent. These serve as quality-control
      levers organizations can use to mitigate inaccuracies and ensure alignment
      with AI tools.
    </p>

    <h3>Tasks That Fit This Role</h3>
    <p>
      In my experience, tasks that work well in this role share the following
      traits:
    </p>
    <ul>
      <li>They repeat often, so small time savings add up.</li>
      <li>
        They involve unstructured input, such as messages, notes, or
        descriptions, that fixed rules can't interpret.
      </li>
      <li>
        Someone already works on the task and can put the AI's output to use.
      </li>
      <li>
        Mistakes in the AI's output are easy to spot, correct, or disregard.
      </li>
      <li>
        The data isn't sensitive, or the sensitive parts can be removed before
        the AI sees it.
      </li>
    </ul>

    <h3>Doing It Safely</h3>
    <p>
      Because the AI step runs within a business process, inconsistent results,
      unpredictable costs, and data privacy become real concerns. The following
      practices can be used to limit these concerns:
    </p>
    <ul>
      <li>
        <strong>Strip sensitive data</strong>: Before the AI gets the data to
        interpret, sensitive information is stripped to ensure data privacy or
        compliance requirements
      </li>
      <li>
        <strong>Interpretation and drafts</strong>: The AI step interprets,
        matches, summarizes, or drafts, and people decide what to do with the
        result.
      </li>
      <li>
        <strong>Limited access</strong>: The AI step can read what it needs and
        add notes or drafts, but it can't send messages, close tickets, or edit
        records.
      </li>
      <li>
        <strong>Approval for customer-facing output</strong>: A person approves
        anything that reaches a customer or changes a record before it takes
        effect. Internal context, such as ticket notes, can be corrected after
        the fact.
      </li>
      <li>
        <strong>One run per item</strong>: Running the AI step once per ticket
        or order keeps token costs in line with the volume of work. Clear limits
        in the instructions, such as which sources to check and how long the
        output should be, also keep the AI step's work predictable and its token
        use in check.
      </li>
      <li>
        <strong>Tracked corrections</strong>: The corrections people make to the
        AI's output show where the AI step's instructions need refinement.
      </li>
    </ul>

    <TeammateScopeDiagram />

    <ArticleExamples title="AI as a teammate" :examples="teammateExamples" />

    <p>
      In the teammate role, people still carry out every action. That keeps risk
      low, but for high-volume tasks, waiting on people can become a bottleneck.
      Once a process is stable and the AI step's output no longer needs frequent
      refinement, the business can let the AI step take the action itself. In
      that sense, an operator is a more mature teammate. It is the same AI step,
      given more responsibility once it has proven to be reliable.
    </p>

    <h2>AI as an Operator</h2>
    <p>
      As an operator, AI makes decisions and acts on them without a person
      approving each decision. AI in this role is often called an agent. While
      people may still be involved to review the cases the agent can't resolve
      within its limits, at least some routine decisions are allowed to be acted
      on by AI operators.
    </p>
    <p>
      This is the hardest role to get right. Results can vary, and token costs
      can be hard to predict. With no one approving each decision, a mistake can
      reach a customer or another system before anyone notices.
    </p>
    <p>
      Few companies, even large ones, have given AI this much responsibility. At
      US companies with 1,000 or more employees, two-thirds of departments use
      AI agents, but only 17% of departments let an agent complete a task
      without a person approving each step.<ArticleCite :n="12" />
    </p>
    <p>
      Day to day, an agent works from written rules. It handles routine cases on
      its own and sends the rest to a person. Those escalated cases show where
      the rules need work.
    </p>

    <h3>Getting There Safely</h3>
    <p>
      A careful way to reach this role is to start with a task that already
      works well with AI as a teammate, then let the AI take over actions
      gradually, starting with the ones that are easiest to reverse.
    </p>

    <ArticleFigure title="Let AI act on its own one step at a time">
      <ArticleFlow
        :steps="[
          {
            eyebrow: 'Step 1',
            text: 'AI suggests, people decide',
            note: 'AI as a teammate',
          },
          {
            eyebrow: 'Step 2',
            text: 'Track how often people correct it',
            note: 'Look for rare corrections',
          },
          {
            eyebrow: 'Step 3',
            text: 'Let AI act on low-risk cases',
            note: 'Review a sample',
          },
          {
            eyebrow: 'Step 4',
            text: 'Act alone within set limits',
            note: 'Exceptions go to people',
          },
        ]"
        loop="Step back if problems show up"
      />
    </ArticleFigure>

    <p>
      Luckily, you can use evidence from past results to decide whether or not a
      task is ready to incorporate an AI operator:
    </p>
    <ul>
      <li>
        If people often correct the AI teammate's output, the task isn't ready
        and you should continue to refine the AI teammate's instructions until
        you reach a stable recommended path.
      </li>
      <li>
        If people rarely correct the AI teammate's recommendations, then that
        task might be ready for an AI operator to act without a person approving
        prior.
      </li>
    </ul>
    <p>
      Once a task runs without approvals, these safeguards keep the agent's
      decisions within bounds:
    </p>
    <ul>
      <li>
        <strong>Small, reversible decisions first</strong>: Flagging, routing,
        or holding an order is safer than issuing a refund or canceling the
        order.
      </li>
      <li>
        <strong>Hard limits</strong>: Define which actions are allowed and set
        caps, such as a maximum order value, so anything beyond them goes to a
        person.
      </li>
      <li>
        <strong>Written rules</strong>: The agent follows documented rules that
        build on the shared instructions from the assistant role.
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

    <h3>Customer-Facing Agents</h3>
    <p>
      A support chatbot would be considered an operator in this context too,
      because each answer it gives is a decision about what to tell a customer.
    </p>
    <p>
      Customer-facing agents carry two risks. The first is legal liability.
      Courts and tribunals have held businesses responsible for what their
      chatbots tell customers, even when no one reviews each answer. In 2024, a
      Canadian tribunal ruled against an airline on this point.<ArticleCite
        :n="13"
      />
    </p>
    <blockquote>
      <p>
        Jake Moffatt asked Air Canada's chatbot about bereavement fares after
        their grandmother died. The chatbot told him he could request the
        bereavement discount after their flight, but the airline's actual policy
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
      In May of this year, a German higher regional court reached a similar
      conclusion about a company's website chatbot.<ArticleCite :n="14" />
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

    <h3>Managing AI Operators</h3>
    <p>
      In my experience, businesses do best with AI as an operator when they
      treat an agent the way they would treat a new employee. The agent starts
      with a small set of tasks and limited access, and it takes on more work
      only after its results show it can handle that work. It's also a good
      practice to have a "manager" for AI operators that can periodically review
      the output for feedback and improvement opportunities.
    </p>

    <ArticleExamples title="AI as an operator" :examples="operatorExamples" />

    <h2>Closing Thoughts</h2>
    <p>
      AI has been widely available for a few years now, and the data
      increasingly links AI's financial gains to businesses that build it into
      core operations, though few see that payoff yet.<ArticleCite :n="4" /> As
      with most new technology, small businesses have a harder time adopting it
      due to time, knowledge, and budget constraints.
    </p>
    <p>
      But this time it's a bit different. AI can ease some of those limitations
      by filling in missing technical knowledge and iteratively solving problems
      at a reasonable cost. One technical person working with AI can now build
      what once took a team of engineers. This may make AI one of the most
      empowering technologies small businesses have had the opportunity to
      engage with since the early internet.
    </p>
    <p>
      The bottleneck has moved as a result. For most small businesses, the
      bottleneck is now the time it takes to define their workflows and
      willingness to evolve their operations. A business that writes down their
      operational workflows can now automate or improve them quickly with AI's
      help. In the reordering example from the builder section, ten hours of
      building with AI could save a store about three and a half hours every
      week.
    </p>
    <p>
      In addition, documentation used to be de-prioritized and viewed as a
      tedious administrative step, whereas now it might just be the first
      tangible step you can take to improve your business:
    </p>
    <ol>
      <li>
        If you aren't using AI yet, start with it as an
        <strong>Assistant</strong> and document your workflows along the way.
      </li>
      <li>
        Use that documentation to automate time-consuming tasks with AI as a
        <strong>Builder</strong>.
      </li>
      <li>
        Add AI as a <strong>Teammate</strong> to interpret and recommend actions
        that align with your workflows and procedures.
      </li>
      <li>
        As those recommendations prove reliable, let AI act on them as an
        <strong>Operator</strong> without a person approving each one, and give
        it more well-defined actions over time.
      </li>
    </ol>
    <p>
      It's rare for a tool this powerful to also offer a gradual path to
      adoption that adds value at each step. Whether you aren't using AI yet or
      already use it regularly, I hope this article shows how you can gradually
      incorporate it into your business operations as the technology keeps
      advancing.
    </p>
  </div>
</template>
