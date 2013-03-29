module ApplicationHelper
  def header_deck_link
    if (defined? @share and @share.persisted?) and defined? @deck
      link_to @deck.name, deck_share_path(@deck.id, @share)
    elsif (defined? @card or defined? @quiz) and defined? @deck
      link_to @deck.name, deck_path(@deck)
    elsif defined? @deck
      @deck.name
    end
  end
end
