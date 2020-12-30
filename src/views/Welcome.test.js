import { mount } from "@vue/test-utils";
import Welcome from "./Welcome.vue";

describe("Welcome.vue", () => {
  test("renders correctly", () => {
    const wrapper = mount(Welcome, {});
    expect(wrapper.text()).toContain("Welcome to the plants app");
  });
});
