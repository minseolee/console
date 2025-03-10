<template>
    <div v-on-click-outside="handleEscape"
         class="dashboard-labels"
         @keydown.esc="handleEscape"
         @keydown.enter="handlePushLabel"
    >
        <p-label
            v-for="(label, index) in state.labelList"
            :key="`dashboard-label-${index}`"
            :text="label"
            :deletable="props.editable"
            @delete="handleDelete(index)"
        />
        <p-icon-button v-if="!state.inputMode && props.editable"
                       style-type="tertiary"
                       name="ic_plus_bold"
                       size="sm"
                       shape="square"
                       @click="handleClickPlus"
        />
        <span v-if="!state.inputMode && !state.labelList.length && props.editable"
              class="dashboard-labels-add-info"
              @click="handleClickPlus"
        >
            {{ $t('DASHBOARDS.CUSTOMIZE.ADD_LABEL') }}
        </span>
        <p-field-group
            v-if="state.inputMode"
            :invalid="invalidState.inputText"
            :invalid-text="invalidTexts.inputText"
        >
            <p-text-input
                :value="inputText"
                :is-focused.sync="state.isInputFocused"
                :invalid="invalidState.inputText"
                size="sm"
                :placeholder="$t('DASHBOARDS.CUSTOMIZE.ENTER_NEW_LABEL')"
                @update:value="setForm('inputText', $event)"
            />
        </p-field-group>
    </div>
</template>

<script setup lang="ts">
// CAUTION: this vOnClickOutside is using !! Please do not remove.
import { vOnClickOutside } from '@vueuse/components';
import {
    computed, reactive,
} from 'vue';

import {
    PFieldGroup, PIconButton, PLabel, PTextInput,
} from '@spaceone/design-system';

import { i18n } from '@/translations';

import { useFormValidator } from '@/common/composables/form-validator';


interface Props {
    labelList: Array<string>;
    editable?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:labelList']);

const {
    forms: {
        inputText,
    },
    setForm,
    invalidState,
    invalidTexts,
} = useFormValidator({
    inputText: '',
}, {
    inputText(value: string) {
        if (value.length > 30) return i18n.t('DASHBOARDS.CUSTOMIZE.VALIDATION_LIMITED_CHAR_LABEL');
        if (state.labelList.find((d) => d === value)) return i18n.t('DASHBOARDS.CUSTOMIZE.VALIDATION_DUPLICATED_LABEL');
        return '';
    },
});

const state = reactive({
    labelList: computed<Array<string>>({
        get: () => props.labelList,
        set(val: Array<string>) { emit('update:labelList', val); },
    }),
    inputMode: false,
    isInputFocused: false,
});

const handleClickPlus = async () => {
    state.inputMode = true;
    state.isInputFocused = true;
};
const handleEscape = () => {
    state.inputMode = false;
    setForm('inputText', '');
};
const handlePushLabel = (e: KeyboardEvent) => {
    if (e.isComposing || !inputText.value || invalidState.inputText) return;
    state.labelList.push(inputText.value);
    setForm('inputText', '');
    emit('update:labelList', state.labelList);
};
const handleDelete = (index: number) => {
    state.labelList.splice(index, 1);
    emit('update:labelList', state.labelList);
};

</script>
<style lang="postcss" scoped>
.dashboard-labels {
    display: flex;
    flex-flow: wrap;
    column-gap: 0.25rem;
    row-gap: 0.25rem;
    max-width: 50%;
    min-height: 2rem;
    padding-top: 0.25rem;
}
.p-icon-button {
    margin-right: 0.25rem;
}

.dashboard-labels-add-info {
    @apply text-gray-500 text-xs pt-1 cursor-pointer;
}

/* custom design-system component - p-label */
.p-label {
    margin: 0.125rem 0;
    max-width: 100%;
    .label-content {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
}
.p-field-group {
    @apply relative;
    margin-bottom: 0;
}

/* custom design-system component - p-text-input */
:deep(.p-text-input) {
    .input-container {
        min-height: 1.5rem;
        height: 1.5rem;
    }
    + .invalid-feedback {
        @apply absolute;
        top: calc(100% + 2px);
        margin-top: 0;
    }
}
</style>
