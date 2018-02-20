// @flow
import * as React from "react";
import { connect } from "react-redux";
import type { DragHandleProps } from "react-beautiful-dnd";
import ListTitle from "./ListTitle";
import Cards from "./Cards";

type Props = {
  boardId: string,
  list: {
    title: string,
    _id: string,
    cards: Array<string>
  },
  cards: Array<{ title: string, _id: string }>,
  dragHandleProps: DragHandleProps,
  i: number
};

type State = {
  cardComposerIsOpen: boolean
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false
    };
  }

  toggleCardComposer = () =>
    this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

  render = () => {
    const { cards, list, boardId, dragHandleProps, i } = this.props;
    const { cardComposerIsOpen } = this.state;
    return (
      <div className="list">
        <ListTitle
          dragHandleProps={dragHandleProps}
          i={i}
          listTitle={list.title}
          listId={list._id}
          cards={list.cards}
          boardId={boardId}
        />
        <div className="cards-wrapper">
          <Cards
            list={list}
            cards={cards}
            cardComposerIsOpen={cardComposerIsOpen}
            toggleCardComposer={this.toggleCardComposer}
            i={i}
            boardId={boardId}
          />
        </div>
        {cardComposerIsOpen || (
          <button
            onClick={this.toggleCardComposer}
            className="open-composer-button"
          >
            Add a card...
          </button>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
