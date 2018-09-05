#!/bin/bash

for f in */*.html
do
    sed 's/raw\/2017-18/raw\/2018-19/g' "$f" >"$f.new"
    rm "$f"
    mv "$f.new" "$f"
done
