<template>
  <div class="wizard-container">
    <div class="step-view">
      <ul>
        <li
          v-for="(step, k) in steps"
          :key="k"
          :class="{'completed': isCompleted(step.slug), 'active': isActive(step.slug)}"
        >
          <a
            href="javascript:void(0);"
            @click="setStep(step)"
          >
            <span class="step">
              {{ k + 1 }}
            </span>
            <g-icon
              name="check-circle"
              :size="'36px'"
            />
            <span class="label">
              {{ step.title }}
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div class="content-view">
      <slot name="content-view" />
      <slot name="buttons" />
      <div
        v-if="!hasButtonsSlot"
        class="buttons"
      >
        <GButton
          v-if="!isFirstStep"
          variant="gray"
          @click="prevStep"
        >
          {{ backButtonTitle || "GERİ DÖN" }}
        </GButton>
        <GButton @click="nextStep">
          <span v-if="isLastStep">
            {{ approveButtonTitle || "ONAYLA VE BİTİR" }}
          </span>
          <span v-else>
            {{ continueButtonTitle || "DEVAM ET" }}
          </span>
        </GButton>
      </div>
    </div>
  </div>
</template>

<script>
import GButton from '../GButton';
import GIcon from '../GIcon';

export default {
  name: 'Wizard',
  components: { GButton, GIcon },
  props: {
    value: {
      type: [String],
      default: () => null,
    },
    validate: {
      type: [Function],
      default: () => Promise.resolve({}),
    },
    continueButtonTitle: [String],
    backButtonTitle: [String],
    approveButtonTitle: [String],
  },
  data () {
    return {
      currentStep: null,
      completedSteps: [],
      steps: [],
      indexes: [],
    };
  },
  computed: {
    isFirstStep () {
      return this.indexes[this.currentStep] === 0;
    },
    isLastStep () {
      return this.indexes[this.currentStep] === this.steps.length - 1;
    },
    hasButtonsSlot () {
      return !!this.$slots.buttons;
    },
    currentIndex () {
      return this.indexes[this.currentStep];
    },
  },
  methods: {
    isCompleted (slug) {
      return this.completedSteps.indexOf(slug) > -1;
    },
    isActive (slug) {
      return this.currentStep === slug;
    },
    setActive (step) {
      this.currentStep = step.slug;
      const currentIndex = this.indexes[this.currentStep];
      this.revertCompletedStep(currentIndex);

      this.$emit('input', step.slug);
    },
    async nextStep () {
      const validate = await this.validate();
      if (!validate) {
        return false;
      }

      if (this.steps[this.currentIndex + 1]) {
        const step = this.steps[this.currentIndex + 1];
        this.completedSteps.push(this.currentStep);
        this.setActive(step);
        this.$emit('wizardNextStep');
      } else {
        this.$emit('wizardFinish');
      }
    },
    prevStep () {
      if (this.steps[this.currentIndex - 1]) {
        const step = this.steps[this.currentIndex - 1];
        this.revertCompletedStep(this.currentIndex);

        this.setActive(step);
        this.$emit('wizardPrevStep');
      }
    },
    setStep (step) {
      if (this.isCompleted(step.slug)) {
        this.setActive(step);
      }
    },
    revertCompletedStep (currentIndex) {
      this.completedSteps = this.completedSteps.filter((step, index) => index < currentIndex);
    },
  },
  mounted () {
    const steps = this.$children
      .filter(child => child.title && child.slug)
      .map((child, i) => ({
        slug: child.slug,
        title: child.title,
        validation: child.validation,
        _index: i,
      }));
    this.steps = steps;
    this.indexes = steps.reduce((ob, item, i) => {
      ob[item.slug] = i;
      return ob;
    }, {});
    this.currentStep = this.value;
  },
};
</script>

<style lang="scss" scoped>
  .wizard-container{
    display: flex;

    .step-view{
      border-right: 2px solid var(--bg-grey-500);
      padding: 30px;
      flex: 1;
      max-width: 250px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          display: block;
          padding: 20px 0;
          position: relative;
          color: var(--mid-grey-500);
          font-size: 14px;
          font-weight: 500;

          &:before, &:after{
            content: '';
            position: absolute;
            left: 15px;
            top: 0;
            border-left: 1px solid var(--mid-grey-800);
            height: 15px;
          }
          &:after{
            top: initial;
            bottom: 0;
          }

          a {
            color: inherit;
            display: flex;
            align-items: center;
            text-decoration: none;
            &:hover{
              text-decoration: none;
            }
          }

          .step {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid var(--mid-grey-800);
            margin-right: 10px;
          }
          .g-icon{
            display: none;
            border: 0;
            margin-right: 10px;
          }

          &:first-child:before,
          &:last-child:after{
            display: none;
          }
          &.active {
            color: #f27a1a;
            a .step{
              border-color: var(--orange-500);
              background-color: var(--orange-500);
              color: var(--white);
            }
          }
          &.completed:not(.active){
            color: var(--green-500);
            .step{
              display: none;
            }
            .g-icon{
              display: inline-flex;
            }
          }
        }
      }
    }
    .content-view{
      flex: 1;
      padding: 30px;

      .buttons{
        margin-top: 30px;
        justify-content: flex-end;
        display:flex;
        .g-button{
          flex: 1;
          max-width: 50%;
          height: 40px;
          border-radius: 6px;
          font-size: 14px;
          margin: 0 15px;
          &:first-child{
            margin-left: 0;
          }
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
