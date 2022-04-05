<template>
  <Popover class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link to="/">
            <span class="sr-only">Code Puzzler</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="./../assets/logo.png"
              alt="vuejs"
            />
          </router-link>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <router-link
            to="/"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Home
          </router-link>
          <router-link
            to="/about"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            About
          </router-link>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <Button
            v-if="$store.state.defaultAccount === ''"
            :disabled="!$store.state.isMetaMask"
            @click="$store.dispatch('onClickConnect')"
            >Connect Wallet</Button
          >
          <Button v-else disabled class="opacity-70 cursor-not-allowed"
            >Connected</Button
          >
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="./../assets/logo.png"
                  alt="vuejs"
                />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-1 gap-y-4 gap-x-8">
              <router-link
                to="/"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Home
              </router-link>

              <router-link
                to="/about"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                About
              </router-link>
            </div>
            <div>
              <Button
                class="w-full"
                v-if="$store.state.defaultAccount === ''"
                :disabled="!$store.state.isMetaMask"
                @click="$store.dispatch('onClickConnect')"
                >Connect Wallet</Button
              >
              <Button
                v-else
                disabled
                class="w-full opacity-70 cursor-not-allowed"
                >Connected</Button
              >
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import Button from './Button.vue'

export default {
  components: {
    Button,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {}
  },
}
</script>
