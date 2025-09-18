import { describe , expect, test} from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";

describe('App', () => {
    test("アプリタイトルが表示されている", () => {
        render(<App />)
        expect(screen.getByRole("heading", {name: "Todoアプリ!"}))
        .toBeInTheDocument();
    });

    test("TDOを追加できる", () => {
        render(<App />);
        const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
        const addButton = screen.getByRole("button", {name: "追加"});
        fireEvent.change(input, {target: {value: "テストタスク"}});
        fireEvent.click(addButton);

        const list = screen.getByRole("list");
        expect(within(list).getByText("テストタスク")).toBeInTheDocument();

        expect(screen.getByText("テストタスク")).toBeInTheDocument()
    })

    test("TODOを完了できる", () => {
        render(<App />);
        const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: "テストタスク"}});
        fireEvent.click(addButton);

        const list = screen.getByRole("list");
        const todoItem = within(list).getByText("テストタスク");
        fireEvent.click(todoItem);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    })

    test("完了したTODOが表示されている", () =>{
        render(<App />);

        const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
        const AddButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: "テストタスク1"}});
        fireEvent.click(AddButton);

        fireEvent.change(input, {target: {value: "テストタスク2"}});
        fireEvent.click(AddButton);

        const checkbox = screen.getAllByRole("checkbox")[1];
        fireEvent.click(checkbox);

        expect(screen.getByText("完了済み: 1 / 2")).toBeInTheDocument();
    })

    test("TODOがない場合はTODOがないことを示すメッセージが表示されている", () =>{
        render(<App />);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();
    })

    test("空のTODOを追加できない", () => {
        render(<App />);

        const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: ""}});
        fireEvent.click(addButton);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();
    })
});