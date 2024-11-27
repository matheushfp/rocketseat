import { expect, test } from "vitest";
import { Slug } from "./slug";

test('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Question Title Example')

    expect(slug.value).toEqual('question-title-example')
})